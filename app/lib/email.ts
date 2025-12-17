import nodemailer from "nodemailer";

/* =====================================================
   ENV CONFIG
===================================================== */

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM = process.env.EMAIL_FROM || "no-reply@example.com";

// Single source of truth for app URL
const APP_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.APP_URL ||
  "http://localhost:3000";

/* =====================================================
   TRANSPORTER
===================================================== */

export const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // true for 465, false otherwise
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

/* =====================================================
   SELLER EMAIL VERIFICATION
===================================================== */

export async function sendVerificationEmail(
  to: string,
  token: string,
  fullName: string
) {
  const verifyUrl = `${APP_URL}/api/auth/seller/verify?token=${token}`;

  const subject = "Verify your seller account";

  const text = `Hi ${fullName},

Please verify your seller account by visiting the link below:
${verifyUrl}

This link will expire in 24 hours.
`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <p>Hi <strong>${fullName}</strong>,</p>

      <p>
        Please verify your seller account by clicking the button below:
      </p>

      <p style="margin: 24px 0">
        <a
          href="${verifyUrl}"
          style="
            background-color: #111827;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
          "
        >
          Verify Email
        </a>
      </p>

      <p>This link will expire in <strong>24 hours</strong>.</p>

      <p>If you did not create this account, you can safely ignore this email.</p>

      <p style="margin-top: 32px">
        — ProSeller Team
      </p>
    </div>
  `;

  if (!transporter) {
    console.warn("📧 Email not configured. Verification URL:", verifyUrl);
    return;
  }

  await transporter.sendMail({
    from: FROM,
    to,
    subject,
    text,
    html,
  });
}

/* =====================================================
   AFFILIATE EMAIL VERIFICATION
===================================================== */

export async function sendAffiliateVerificationEmail(
  to: string,
  token: string,
  fullName: string
) {
  const verifyUrl = `${APP_URL}/api/auth/affiliate/verify?token=${token}`;

  const subject = "Verify your affiliate account";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <p>Hello <strong>${fullName}</strong>,</p>

      <p>Please verify your affiliate account by clicking the link below:</p>

      <p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      </p>

      <p>This link will expire in 24 hours.</p>

      <p>— ProSeller Team</p>
    </div>
  `;

  if (!transporter) {
    console.warn("📧 Affiliate email not configured. URL:", verifyUrl);
    return;
  }

  await transporter.sendMail({
    from: FROM,
    to,
    subject,
    html,
  });
}
