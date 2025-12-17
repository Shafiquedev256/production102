// lib/cookies.ts
import { serialize } from "cookie";

export function setJwtCookie(token: string) {
  // Adjust domain/path/samesite/secure according to your deployment
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}
