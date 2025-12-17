import { NextRequest } from "next/server";
import crypto from "crypto";
import db from "../../../../lib/db";
import { sendAffiliateVerificationEmail } from "../../../../lib/email";
import { jsonResponse } from "../../../../utils/jsonResponse";
import { isRateLimited } from "../../../../lib/rateLimiter";
import { z } from "zod";

// Validate request body
const resendSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

    // Rate limit per IP
    if (typeof isRateLimited === "function" && isRateLimited(`resend:${ip}`)) {
      return jsonResponse(null, 429, "Too many requests. Try again later.");
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonResponse(null, 400, "Invalid JSON body");
    }

    const parsed = resendSchema.safeParse(body);
    if (!parsed.success) {
      return jsonResponse(
        { errors: parsed.error.flatten().fieldErrors },
        400,
        "Invalid input data"
      );
    }

    const email = parsed.data.email.toLowerCase().trim();

    const affiliates = await db.getCollection("affiliates");
    const affiliate = await affiliates.findOne({ email });

    if (!affiliate) {
      return jsonResponse(null, 404, "Affiliate account not found");
    }

    if (affiliate.isEmailVerified) {
      return jsonResponse(null, 400, "Email is already verified");
    }

    // Generate a new verification token
    const newToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    // Update affiliate document
    await affiliates.updateOne(
      { _id: affiliate._id },
      {
        $set: {
          verificationToken: newToken,
          verificationTokenExpires: tokenExpires,
        },
      }
    );

    // Send verification email (fire-and-forget)
    sendAffiliateVerificationEmail(email, newToken, affiliate.fullName).catch(
      (err) => {
        console.error("RESEND_EMAIL_ERROR:", err);
      }
    );

    return jsonResponse(
      { message: "Verification email resent successfully" },
      200
    );
  } catch (err) {
    console.error("RESEND_VERIFICATION_ERROR:", err);
    return jsonResponse(null, 500, "Internal server error");
  }
}
