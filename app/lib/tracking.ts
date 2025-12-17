import crypto from "crypto";

export function generateClickToken(): string {
  return crypto.randomBytes(32).toString("hex"); // 64 hex chars
}

export function hmac(value: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}
