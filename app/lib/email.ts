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
  const verifyUrl = `${APP_URL}/auth/seller/verify?token=${token}`;
  const subject = "Verify your seller account";

  const html = `
  <div style="font-family: 'Arial', sans-serif; background: #FFF7ED; color: #333; padding: 40px 20px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
      
      <tr>
        <td align="center" style="padding: 40px 20px; background: linear-gradient(90deg, #F97316, #FBBF24);">
          <div style="font-size: 48px; color: #fff;">🏪</div>
          <h1 style="margin: 10px 0 0; color: #fff; font-size: 28px;">Welcome, ${fullName}!</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 30px 30px 20px 30px; text-align: center;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0;">
            Thank you for registering as a seller on ProSeller. To activate your account, please verify your email by clicking the button below:
          </p>
          
          <a href="${verifyUrl}" style="
            display: inline-block;
            margin: 25px 0;
            padding: 14px 28px;
            background: linear-gradient(90deg, #F97316, #FBBF24);
            color: #fff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
          ">
            Verify Your Email
          </a>

          <p style="font-size: 14px; color: #666; line-height: 1.4;">
            If the button does not work, copy and paste this link into your browser:
          </p>
          <p style="word-break: break-all; font-size: 14px; color: #F97316;">
            <a href="${verifyUrl}" style="color: #F97316; text-decoration: underline;">${verifyUrl}</a>
          </p>

          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            This link will expire in 24 hours.
          </p>

          <p style="font-size: 14px; color: #888; margin-top: 20px;">
            If you did not create this account, you can safely ignore this email.
          </p>
        </td>
      </tr>
      
      <tr>
        <td align="center" style="padding: 20px; background: #FFF7ED; font-size: 14px; color: #888;">
          — ProSeller Team
        </td>
      </tr>
    </table>
  </div>
  `;

  const text = `Hi ${fullName},

Please verify your seller account by visiting the link below:
${verifyUrl}

This link will expire in 24 hours.

If you did not create this account, you can safely ignore this email.

— ProSeller Team`;

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
  const verifyUrl = `${APP_URL}/auth/affiliate/verify-email?token=${token}`;
  const subject = "Verify your affiliate account";

  const html = `
  <div style="font-family: 'Arial', sans-serif; background: #FFF7ED; color: #333; padding: 40px 20px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
      <tr>
        <td align="center" style="padding: 40px 20px; background: linear-gradient(90deg, #F97316, #FBBF24);">
          <div style="font-size: 48px; color: #fff;">🎯</div>
          <h1 style="margin: 10px 0 0; color: #fff; font-size: 28px;">Welcome, ${fullName}!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px 30px 20px 30px; text-align: center;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0;">
            Thank you for joining our affiliate program. To start earning, please verify your email by clicking the button below:
          </p>
          <a href="${verifyUrl}" style="
            display: inline-block;
            margin: 25px 0;
            padding: 14px 28px;
            background: linear-gradient(90deg, #F97316, #FBBF24);
            color: #fff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
          ">
            Verify Your Email
          </a>
          <p style="font-size: 14px; color: #666; line-height: 1.4;">
            If the button does not work, copy and paste this link into your browser:
          </p>
          <p style="word-break: break-all; font-size: 14px; color: #F97316;">
            <a href="${verifyUrl}" style="color: #F97316; text-decoration: underline;">${verifyUrl}</a>
          </p>
          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            This link will expire in 24 hours.
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background: #FFF7ED; font-size: 14px; color: #888;">
          — ProSeller Team
        </td>
      </tr>
    </table>
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
