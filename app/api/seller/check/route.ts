// app/api/seller/details/route.ts
import { NextRequest, NextResponse } from "next/server";
import Seller from "../../../models/sellers";
import { dbConnect } from "../../../lib/mongoose";
import { verifyJwt } from "../../../lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );

    let payload: any;
    try {
      payload = verifyJwt(token);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const seller = await Seller.findById(payload.sellerId).lean();
    if (!seller)
      return NextResponse.json(
        { success: false, error: "Seller not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: seller });
  } catch (err) {
    console.error("SELLER_DETAILS_ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
