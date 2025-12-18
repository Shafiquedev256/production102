import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Seller from "@/app/models/sellers";
import { dbConnect } from "@/app/lib/mongoose";

export async function POST(req: NextRequest) {
  await dbConnect();

  const cooky = await cookies();
  const refreshToken = cooky.get("refreshToken")?.value;
  if (!refreshToken)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const seller = await Seller.findById(payload.sub);
  if (!seller)
    return NextResponse.json({ error: "Seller not found" }, { status: 404 });

  // Optional: token version check
  if (payload.tokenVersion !== seller.tokenVersion)
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );

  // Generate new access token
  const newAccessToken = signAccessToken({
    sub: seller._id.toString(),
    role: "seller",
  });

  cooky.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  });

  return NextResponse.json({ success: true });
}
