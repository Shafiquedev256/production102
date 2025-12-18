// app/api/auth/seller/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import Seller from "@/app/models/sellers";
import { verifyAccessToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Optional: invalidate refresh tokens by incrementing tokenVersion
    const token = req.cookies.get("accessToken")?.value;
    if (token) {
      try {
        const payload = verifyAccessToken(token);
        if (payload.sub) {
          await Seller.findByIdAndUpdate(payload.sub, {
            $inc: { tokenVersion: 1 },
          });
        }
      } catch {
        // ignore invalid token
      }
    }

    // Build absolute URL for redirect
    const baseUrl = req.nextUrl.origin; // automatically gets the origin
    const response = NextResponse.redirect(`${baseUrl}/`); // absolute URL required in Next.js 14

    // Clear cookies
    response.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
    response.cookies.set("refreshToken", "", {
      path: "/api/auth/refresh",
      maxAge: 0,
    });

    return response;
  } catch (err) {
    console.error("LOGOUT_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
