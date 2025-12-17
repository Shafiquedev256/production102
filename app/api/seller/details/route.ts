// app/api/seller/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongoose";
import Seller from "../../../models/sellers";
import { verifyJwt } from "../../../lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("token")?.value;
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

    const seller = await Seller.findById(payload.sellerId).lean();
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    // Remove sensitive fields
    const {
      password,
      emailVerificationToken,
      phoneVerificationCode,
      ...safeSeller
    } = seller;

    return NextResponse.json({ success: true, data: safeSeller });
  } catch (err: any) {
    console.error("GET /api/seller/me Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
