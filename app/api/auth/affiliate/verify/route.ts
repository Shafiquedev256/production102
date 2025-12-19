import db from "../../../../lib/db";
import { jsonResponse } from "../../../../utils/jsonResponse";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return jsonResponse(null, 400, "Missing verification token");
    }

    const affiliates = await db.getCollection("affiliates");

    // ✅ FIND BY CORRECT FIELD
    const affiliate = await affiliates.findOne({
      emailVerificationToken: token,
    });

    if (!affiliate) {
      return jsonResponse(null, 400, "Invalid or expired token");
    }

    // ✅ CHECK EXPIRATION
    if (
      affiliate.emailVerificationExpires &&
      affiliate.emailVerificationExpires < new Date()
    ) {
      return jsonResponse(null, 400, "Verification token has expired");
    }

    // ✅ VERIFY & CLEAN UP
    await affiliates.updateOne(
      { _id: affiliate._id },
      {
        $set: {
          isEmailVerified: true,
          status: "active",
          updatedAt: new Date(),
        },
        $unset: {
          emailVerificationToken: "",
          emailVerificationExpires: "",
          emailVerificationIssuedAt: "",
        },
      }
    );

    return jsonResponse(null, 200, "Email verified successfully");
  } catch (err) {
    console.error("AFFILIATE_VERIFY_ERROR:", err);
    return jsonResponse(null, 500, "Server error");
  }
}
