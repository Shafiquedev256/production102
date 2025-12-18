import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import Seller from "@/app/models/sellers";
import { verifyAccessToken } from "@/app/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("accessToken")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const seller = await Seller.findById(payload.sub).lean();
    if (!seller)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });

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
