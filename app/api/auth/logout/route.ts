// app/api/auth/logout/route.ts
import Seller from "../../../models/sellers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Await cookies() if TS says it's a Promise
  const cookieStore = await cookies(); // <-- fix for TS

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    const payload = JSON.parse(
      Buffer.from(refreshToken.split(".")[1], "base64").toString()
    );

    await Seller.findByIdAndUpdate(payload.sellerId, {
      $inc: { refreshTokenVersion: 1 },
    });
  }

  const res = NextResponse.json({ success: true });

  // Clear cookies by overwriting them with maxAge: 0
  res.cookies.set({
    name: "accessToken",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.cookies.set({
    name: "refreshToken",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
