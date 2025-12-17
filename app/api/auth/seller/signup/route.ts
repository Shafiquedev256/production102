import { z } from "zod";
import crypto from "crypto";
import { NextResponse } from "next/server";
import Seller from "@/app/models/sellers";
import { hashPassword } from "@/app/lib/auth";
import { sendVerificationEmail } from "@/app/lib/email";
import { dbConnect } from "@/app/lib/mongoose";

const signupSchema = z.object({
  businessName: z.string().min(2),
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(6),
  password: z.string().min(8),
  country: z.string().min(2),
});

const COUNTRY_CURRENCY: Record<string, string> = {
  uganda: "UGX",
  kenya: "KES",
  tanzania: "TZS",
  rwanda: "RWF",
  nigeria: "NGN",
  ghana: "GHS",
  "south-africa": "ZAR",
};

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    const { businessName, fullName, email, phoneNumber, password, country } =
      parsed.data;

    const normalizedEmail = email.toLowerCase().trim();
    const currency = COUNTRY_CURRENCY[country.toLowerCase()] || "UGX";

    // Check duplicates
    const exists = await Seller.findOne({
      $or: [{ email: normalizedEmail }, { phone: phoneNumber }],
    });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "Email or phone already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const emailToken = crypto.randomBytes(32).toString("hex");

    const seller = await Seller.create({
      sellerId: `SEL-${crypto.randomUUID()}`,
      businessName,
      fullName,
      email: normalizedEmail,
      phone: phoneNumber,
      country,
      currency,
      password: passwordHash,

      isEmailVerified: false,
      emailVerificationToken: emailToken,
      emailVerificationExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),

      status: "pending",
    });

    await sendVerificationEmail(seller.email, emailToken, seller.fullName);

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful. Check your email to verify.",
        email: seller.email,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("SELLER_SIGNUP_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
