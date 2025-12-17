import db from "../../../../lib/db";
import { jsonResponse } from "../../../../utils/jsonResponse";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) return jsonResponse(null, 400, "Missing token");

    const affiliates = await db.getCollection("affiliates");

    const affiliate = await affiliates.findOne({ verificationToken: token });
    if (!affiliate) return jsonResponse(null, 400, "Invalid or expired token");

    await affiliates.updateOne(
      { verificationToken: token },
      {
        $set: { isEmailVerified: true },
        $unset: { verificationToken: "", verificationTokenIssuedAt: "" },
      }
    );

    return jsonResponse(null, 200, "Email verified successfully");
  } catch (err) {
    console.error("AFFILIATE_VERIFY_ERROR:", err);
    return jsonResponse(null, 500, "Server error");
  }
}
