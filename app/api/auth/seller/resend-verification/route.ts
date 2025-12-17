import { NextRequest, NextResponse } from "next/server";
import Seller from "@/app/models/sellers";
import { dbConnect } from "@/app/lib/mongoose";
import crypto from "crypto";
import { sendVerificationEmail } from "@/app/lib/email";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const seller = await Seller.findOne({ email: email.toLowerCase().trim() });

    if (!seller) {
      return NextResponse.json(
        { success: false, message: "Seller not found" },
        { status: 404 }
      );
    }

    if (seller.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Email is already verified" },
        { status: 400 }
      );
    }

    // Generate new verification token and expiration (24 hours)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    seller.emailVerificationToken = verificationToken;
    seller.emailVerificationExpires = expires;
    await seller.save();

    // Send verification email
    await sendVerificationEmail(
      seller.email,
      verificationToken,
      seller.fullName
    );

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (err) {
    console.error("RESEND_VERIFICATION_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
