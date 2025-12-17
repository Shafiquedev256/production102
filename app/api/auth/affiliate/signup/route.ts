// app/api/affiliates/signup/route.ts
import { z } from "zod";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { connectToDatabase, getCollection } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/password";
import { sendAffiliateVerificationEmail } from "../../../../lib/email";
import { jsonResponse } from "../../../../utils/jsonResponse";
import { isRateLimited } from "../../../../lib/rateLimiter";

/**
 * Input validation
 */
const affiliateSignupSchema = z.object({
  fullName: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z
    .string()
    .min(6)
    .max(30)
    .optional()
    .transform((s) => (typeof s === "string" ? s.replace(/[^\d+]/g, "") : s)),
  password: z.string().min(8),
});

/**
 * POST /api/affiliates/signup
 */
export async function POST(req: NextRequest) {
  try {
    // -------------------------
    // Extract client IP (safe)
    // -------------------------
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    // -------------------------
    // Optional rate limiting
    // -------------------------
    if (
      typeof isRateLimited === "function" &&
      isRateLimited(`affiliate_signup:${ip}`)
    ) {
      return jsonResponse(
        null,
        429,
        "Too many requests. Please try again later."
      );
    }

    // -------------------------
    // Parse body safely
    // -------------------------
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonResponse(null, 400, "Invalid JSON body");
    }

    // -------------------------
    // Validate input
    // -------------------------
    const parsed = affiliateSignupSchema.safeParse(body);
    if (!parsed.success) {
      // Provide field-level errors to frontend
      return jsonResponse(
        { errors: parsed.error.flatten().fieldErrors },
        400,
        "Invalid input data"
      );
    }

    const { fullName, email, phone, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // -------------------------
    // DB connection
    // -------------------------
    await connectToDatabase(); // ensures cached client established
    const affiliates = await getCollection("affiliates");

    // -------------------------
    // Check if email exists
    // -------------------------
    const existing = await affiliates.findOne(
      { email: normalizedEmail },
      { projection: { _id: 1, isEmailVerified: 1 } }
    );

    if (existing) {
      // Distinguish between existing-but-unverified vs fully existing accounts
      return jsonResponse(
        null,
        409,
        existing.isEmailVerified
          ? "Email already in use. Please log in."
          : "An account exists with this email but it has not been verified. Check your inbox or resend verification."
      );
    }

    // -------------------------
    // Hash password
    // -------------------------
    const hashedPassword = await hashPassword(password);

    // -------------------------
    // Verification token + affiliateId + defaults
    // -------------------------
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const now = new Date();
    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    const affiliateId = crypto.randomUUID();
    const referralCode =
      (fullName.match(/\b\w/g)?.slice(0, 3).join("").toUpperCase() || "AFF") +
      crypto.randomBytes(2).toString("hex").toUpperCase();

    const doc = {
      affiliateId,
      fullName,
      email: normalizedEmail,
      phone: phone || null,
      password: hashedPassword,

      // verification
      isEmailVerified: false,
      emailVerificationToken,
      emailVerificationExpires: tokenExpiry,
      emailVerificationIssuedAt: now,

      // defaults & profile
      status: "pending",
      isPhoneVerified: false,
      referralCode,
      referredBy: null,
      referrals: [],
      referralTier: 1,

      // financials
      commissionRate: 0.1, // 10% default
      totalEarnings: 0,
      pendingPayout: 0,
      lifetimeWithdrawn: 0,
      payouts: [],

      // metrics
      stats: {
        clicks: 0,
        conversions: 0,
        sales: 0,
        conversionRate: 0,
        totalLeads: 0,
      },

      trafficSources: [],
      riskScore: 0,
      flaggedReasons: [],
      suspiciousIps: [],
      suspiciousActivities: [],

      // api
      apiKey: crypto.randomBytes(16).toString("hex"),
      apiKeyCreatedAt: now,
      apiKeyLastUsedAt: null,
      apiRequestCount: 0,
      rateLimiter: { windowStart: now, requestCount: 0 },

      // audit
      createdAt: now,
      updatedAt: now,

      metadata: {
        signupIp: ip,
        userAgent: req.headers.get("user-agent") || null,
      },
    };

    // -------------------------
    // Insert
    // -------------------------
    const insertResult = await affiliates.insertOne(doc);

    // -------------------------
    // Fire-and-forget email send
    // -------------------------
    // sendAffiliateVerificationEmail(to, token, fullName)
    sendAffiliateVerificationEmail(
      normalizedEmail,
      emailVerificationToken,
      fullName
    ).catch((err) => {
      // Log but don't fail the request
      console.error("AFFILIATE_VERIFICATION_EMAIL_ERROR:", err);
    });

    // -------------------------
    // Success response
    // -------------------------
    return jsonResponse(
      {
        affiliateId: insertResult.insertedId,
      },
      201,
      "Signup successful. Please check your email for a verification link."
    );
  } catch (err) {
    console.error("AFFILIATE_SIGNUP_FATAL_ERROR:", err);
    return jsonResponse(null, 500, "Internal server error");
  }
}
