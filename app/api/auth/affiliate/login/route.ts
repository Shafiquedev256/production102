// app/api/auth/affiliate/login/route.ts
import { z } from "zod";
import db from "../../../../lib/db";
import { comparePassword, signJwt, setJwtCookie } from "../../../../lib/auth";
import { jsonResponse } from "../../../../utils/jsonResponse";
import { isRateLimited } from "../../../../lib/rateLimiter";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

    /** RATE LIMIT CHECK */
    if (typeof isRateLimited === "function" && isRateLimited(`affiliate-login:${ip}`)) {
      return jsonResponse(null, 429, "Too many login attempts. Try again later.");
    }

    /** PARSE BODY */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonResponse(null, 400, "Invalid JSON body");
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonResponse({ errors: parsed.error.flatten().fieldErrors }, 400, "Invalid input data");
    }

    const { email, password } = parsed.data;
    const sanitizedEmail = email.toLowerCase().trim();

    /** GET AFFILIATES COLLECTION */
    const affiliates = await db.getCollection("affiliates");

    /** FIND AFFILIATE */
    const affiliate = await affiliates.findOne({ email: sanitizedEmail });

    if (!affiliate) {
      return jsonResponse(null, 401, "Invalid email or password");
    }

    /** CHECK EMAIL VERIFIED */
    if (!affiliate.isEmailVerified) {
      return jsonResponse(null, 403, "Email not verified. Please check your inbox.");
    }

    /** CHECK IF BANNED */
    if (affiliate.isBanned) {
      return jsonResponse(null, 403, "Your account has been suspended. Contact support.");
    }

    /** PASSWORD CHECK */
    const isValidPassword = await comparePassword(password, affiliate.password);
    if (!isValidPassword) {
      // Optional: increment failed login attempts here for security
      await affiliates.updateOne(
        { _id: affiliate._id },
        { $inc: { failedLoginAttempts: 1 }, $set: { lastFailedLoginAt: new Date() } }
      );

      return jsonResponse(null, 401, "Invalid email or password");
    }

    /** RESET FAILED ATTEMPTS ON SUCCESSFUL LOGIN */
    await affiliates.updateOne(
      { _id: affiliate._id },
      { $set: { lastLoginAt: new Date(), lastLoginIp: ip, failedLoginAttempts: 0 } }
    );

    /** GENERATE JWT & COOKIE */
    const token = signJwt({ sub: affiliate.affiliateId, role: "affiliate" });
    const cookie = setJwtCookie(token);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        data: { affiliateId: affiliate.affiliateId, fullName: affiliate.fullName },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (err) {
    console.error("AFFILIATE_LOGIN_ERROR:", err);
    return jsonResponse(null, 500, "Internal server error");
  }
}
