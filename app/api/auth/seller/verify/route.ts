import { NextResponse } from "next/server";
import Seller from "@/app/models/sellers";
import { dbConnect } from "@/app/lib/mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token missing" },
        { status: 400 }
      );
    }

    const seller = await Seller.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!seller) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    seller.isEmailVerified = true;
    seller.emailVerificationToken = undefined;
    seller.emailVerificationExpires = undefined;
    seller.status = "active";

    await seller.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });
  } catch (err) {
    console.error("EMAIL_VERIFY_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
