import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { dbConnect } from "../../../lib/mongoose";
import Seller from "../../../models/sellers";
import Product from "../../../models/Product";
import {
  ensureDir,
  generateFilename,
  bytesToMB,
  getKind,
} from "../../../lib/mediaProcessor";
import { verifyAccessToken } from "../../../lib/jwt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // -----------------------------
    // Extract token from server-side cookies
    // -----------------------------
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // -----------------------------
    // Verify token
    // -----------------------------
    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // -----------------------------
    // Find seller
    // -----------------------------
    const seller = await Seller.findById(payload.sub);
    if (!seller)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // -----------------------------
    // Parse formData
    // -----------------------------
    const formData = await req.formData();
    let productId = req.headers.get("x-product-id");
    let product;

    if (productId) {
      product = await Product.findById(productId);
      if (!product || product.sellerId.toString() !== seller._id.toString())
        return NextResponse.json({ error: "Invalid product" }, { status: 403 });
    } else {
      const title = formData.get("title")?.toString() || "Untitled Product";
      const description =
        formData.get("description")?.toString() || "No description";
      const category = formData.get("category")?.toString() || "uncategorized";
      const currency = formData.get("currency")?.toString() || "USD";
      const price = parseFloat(formData.get("price")?.toString() || "0");

      product = await Product.create({
        title,
        description,
        category,
        currency,
        price,
        sellerId: seller._id,
        images: [],
        videos: [],
        documents: [],
        createdAt: new Date(),
      });
      productId = product._id.toString();
    }

    // -----------------------------
    // Handle files
    // -----------------------------
    const files: File[] = [];
    for (const [, value] of formData.entries()) {
      if (value instanceof File) files.push(value);
    }
    if (!files.length)
      return NextResponse.json({ error: "No files provided" }, { status: 400 });

    const uploadedItems: any[] = [];
    const baseDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      seller._id.toString()
    );
    await ensureDir(baseDir);

    for (const file of files) {
      const kind = getKind(file.type);
      const sizeMB = bytesToMB(file.size);

      // Check per-file limits
      if (
        (kind === "image" && sizeMB > seller.uploadLimits.maxImageSizeMB) ||
        (kind === "video" && sizeMB > seller.uploadLimits.maxVideoSizeMB)
      ) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds size limit` },
          { status: 413 }
        );
      }

      const uploadDir = path.join(baseDir, `${kind}s`);
      await ensureDir(uploadDir);

      const filename = generateFilename(file.name);
      await fs.writeFile(
        path.join(uploadDir, filename),
        Buffer.from(await file.arrayBuffer())
      );

      uploadedItems.push({
        url: `/uploads/${seller._id}/${kind}s/${filename}`,
        filename,
        sizeMB,
        mimeType: file.type,
        kind,
      });
    }

    // -----------------------------
    // Update product DB
    // -----------------------------
    await Product.findByIdAndUpdate(productId, {
      $push: {
        images: { $each: uploadedItems.filter((i) => i.kind === "image") },
        videos: { $each: uploadedItems.filter((i) => i.kind === "video") },
        documents: {
          $each: uploadedItems.filter(
            (i) => i.kind === "pdf" || i.kind === "promo"
          ),
        },
      },
    });

    // -----------------------------
    // Update seller storage
    // -----------------------------
    await Seller.findByIdAndUpdate(seller._id, {
      $inc: {
        storageUsedMB: uploadedItems.reduce((acc, i) => acc + i.sizeMB, 0),
      },
    });

    return NextResponse.json({ productId, uploadedItems });
  } catch (err: any) {
    console.error("Upload API Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
