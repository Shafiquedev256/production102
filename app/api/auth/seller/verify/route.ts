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

    // ✅ Update seller verification status
    seller.isEmailVerified = true;
    seller.emailVerificationToken = undefined;
    seller.emailVerificationExpires = undefined;
    seller.status = "active";

    await seller.save();

    // ✅ Ensure NEXT_PUBLIC_BASE_URL exists
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("EMAIL_VERIFY_ERROR: NEXT_PUBLIC_BASE_URL is not set");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // ✅ Construct absolute URL for redirect
    const redirectUrl = new URL(
      "/auth/seller/verify-success",
      baseUrl
    ).toString();

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("EMAIL_VERIFY_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
