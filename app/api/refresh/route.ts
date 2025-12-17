// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Seller from "../../models/sellers";
import Affiliate from "../../models/Affiliate";
import { signJwt } from "../../lib/jwt";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return NextResponse.json({}, { status: 401 });

  try {
    const { payload } = await jwtVerify(refreshToken, SECRET);

    const { sub, role, tokenVersion } = payload as {
      sub: string;
      role: "seller" | "affiliate";
      tokenVersion: number;
    };

    const Model = role === "seller" ? Seller : Affiliate;
    const user = await Model.findById(sub);
    if (!user) throw new Error("User not found");

    if ((user.refreshTokenVersion || 0) !== tokenVersion)
      throw new Error("Invalid token version");

    const newAccessToken = signJwt({
      sub: user._id.toString(),
      role,
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
    });

    return res;
  } catch (err) {
    console.error("REFRESH_TOKEN_ERROR:", err);
    return NextResponse.json({}, { status: 401 });
  }
}
