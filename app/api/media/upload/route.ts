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
import { verifyJwt } from "../../../lib/auth";

export const runtime = "nodejs";

function getTokenFromCookie(header: string | null): string | null {
  if (!header) return null;
  const match = header.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB connection

    const token = getTokenFromCookie(req.headers.get("cookie"));
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let payload: any;
    try {
      payload = verifyJwt(token);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!payload.sellerId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const seller = await Seller.findById(payload.sellerId);

    const formData = await req.formData();
    let productId = req.headers.get("x-product-id");
    let product;

    // -----------------------------
    // Create product if not provided
    // -----------------------------
    if (productId) {
      product = await Product.findById(productId);
      if (!product || product.sellerId.toString() !== seller._id.toString()) {
        return NextResponse.json({ error: "Invalid product" }, { status: 403 });
      }
    } else {
      const title = formData.get("title")?.toString() || "Untitled Product";
      const description =
        formData.get("description")?.toString() || "No description";
      const category = formData.get("category")?.toString() || "uncategorized";
      const currency = formData.get("currency")?.toString() || "USD";
      const price = parseFloat(formData.get("price")?.toString() || "0");

      product = new Product({
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

      await product.save();
      productId = product._id.toString();
    }

    // -----------------------------
    // Handle file uploads
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

      // Seller limits
      if (
        (kind === "image" && sizeMB > seller.uploadLimits.maxImageSizeMB) ||
        (kind === "video" && sizeMB > seller.uploadLimits.maxVideoSizeMB)
      ) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds size limit` },
          { status: 413 }
        );
      }

      // Per-product limits
      const currentCount =
        kind === "image"
          ? product.images.length +
            uploadedItems.filter((i) => i.kind === "image").length
          : kind === "video"
            ? product.videos.length +
              uploadedItems.filter((i) => i.kind === "video").length
            : 0;

      if (
        (kind === "image" &&
          currentCount >= seller.uploadLimits.maxImagesPerProduct) ||
        (kind === "video" &&
          currentCount >= seller.uploadLimits.maxVideosPerProduct)
      ) {
        return NextResponse.json(
          { error: `${kind} limit reached` },
          { status: 409 }
        );
      }

      // Storage quota
      const totalStorageAfter =
        seller.storageUsedMB +
        uploadedItems.reduce((acc, i) => acc + i.sizeMB, 0) +
        sizeMB;
      if (totalStorageAfter > seller.storageLimitMB) {
        return NextResponse.json(
          { error: "Storage quota exceeded" },
          { status: 413 }
        );
      }

      // Write file
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
    // Save to DB
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
