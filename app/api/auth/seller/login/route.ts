import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/app/lib/password";
import { signJwt } from "@/app/lib/jwt";
import { setJwtCookie } from "@/app/lib/cookies";
import Seller from "@/app/models/sellers";
import { dbConnect } from "@/app/lib/mongoose";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

    const body = await req.json().catch(() => null);
    if (!body)
      return NextResponse.json(
        { success: false, message: "Invalid JSON" },
        { status: 400 }
      );

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          issues: parsed.error.format(),
        },
        { status: 400 }
      );

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const seller = await Seller.findOne({ email: normalizedEmail }).select(
      "password isEmailVerified status failedLoginAttempts lastLoginAt lastLoginIp"
    );

    if (!seller || seller.status === "banned") {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!seller.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Email not verified" },
        { status: 403 }
      );
    }

    const valid = await verifyPassword(password, seller.password);
    if (!valid) {
      seller.failedLoginAttempts += 1;
      await seller.save();
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    seller.lastLoginAt = new Date();
    seller.lastLoginIp = ip;
    seller.failedLoginAttempts = 0;
    await seller.save();

    const token = signJwt({ sub: seller._id.toString(), role: "seller" });
    const cookie = setJwtCookie(token);

    return NextResponse.json(
      { success: true, data: { sellerId: seller._id } },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (err) {
    console.error("SELLER_LOGIN_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
