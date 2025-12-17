import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

// ---------------------------
// PASSWORD HASHING
// ---------------------------
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

// ---------------------------
// SIGN JWT
// ---------------------------
export function signJwt(
  payload: string | object,
  options: SignOptions = { expiresIn: "7d" }
): string {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secret, options);
}

// ---------------------------
// VERIFY JWT
// ---------------------------
export function verifyJwt<T extends JwtPayload>(token: string): T {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined in environment variables");

  const payload = jwt.verify(token, secret);
  return payload as T; // safer if T extends JwtPayload
}

// ---------------------------
// SET JWT COOKIE
// ---------------------------
export function setJwtCookie(token: string, maxAge = 60 * 60 * 24 * 7): string {
  const secure = process.env.NODE_ENV === "production";

  return [
    `token=${token}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}
