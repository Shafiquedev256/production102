import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/app/lib/password";
import { signAccessToken, signRefreshToken } from "@/app/lib/jwt";
import Seller from "@/app/models/sellers";
import { dbConnect } from "@/app/lib/mongoose";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => null);
    if (!body)
      return NextResponse.json(
        { success: false, message: "Invalid JSON" },
        { status: 400 }
      );

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const seller = await Seller.findOne({ email: normalizedEmail }).select(
      "password isEmailVerified status failedLoginAttempts lastLoginAt lastLoginIp tokenVersion"
    );

    if (!seller || seller.status === "banned")
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    if (!seller.isEmailVerified)
      return NextResponse.json(
        { success: false, message: "Email not verified" },
        { status: 403 }
      );

    const valid = await verifyPassword(password, seller.password);
    if (!valid) {
      seller.failedLoginAttempts += 1;
      await seller.save();
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Reset failed attempts
    seller.failedLoginAttempts = 0;
    seller.lastLoginAt = new Date();
    await seller.save();

    // Generate tokens
    const accessToken = signAccessToken({
      sub: seller._id.toString(),
      role: "seller",
    });
    const refreshToken = signRefreshToken({
      sub: seller._id.toString(),
      role: "seller",
      tokenVersion: seller.tokenVersion || 0,
    });

    // Set cookies
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 min
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json(
      { success: true, data: { sellerId: seller._id } },
      { status: 200 }
    );
  } catch (err) {
    console.error("SELLER_LOGIN_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
