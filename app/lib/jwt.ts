// lib/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";

/* =====================================================
   ENV SAFETY (fail fast – production-grade)
===================================================== */

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const SECRET = process.env.JWT_SECRET;

/* =====================================================
   SHARED TYPES
===================================================== */

export type UserRole = "seller" | "affiliate";

export interface AccessTokenPayload {
  sub: string; // user id
  role: UserRole;
}

export interface RefreshTokenPayload extends AccessTokenPayload {
  tokenVersion: number;
}

/* =====================================================
   TOKEN OPTIONS
===================================================== */

const ACCESS_TOKEN_OPTIONS: SignOptions = {
  expiresIn: "10m",
};

const REFRESH_TOKEN_OPTIONS: SignOptions = {
  expiresIn: "1d",
};

/* =====================================================
   SIGN TOKENS
===================================================== */

// Generic signer (kept for backward compatibility)
export function signJwt<T extends object>(
  payload: T,
  options: SignOptions = ACCESS_TOKEN_OPTIONS
): string {
  return jwt.sign(payload, SECRET, options);
}

// Explicit access token signer (RECOMMENDED)
export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, SECRET, ACCESS_TOKEN_OPTIONS);
}

// Explicit refresh token signer
export function signRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, SECRET, REFRESH_TOKEN_OPTIONS);
}

/* =====================================================
   VERIFY TOKENS
===================================================== */

export function verifyJwt<T extends object>(token: string): T {
  return jwt.verify(token, SECRET) as T;
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    return jwt.verify(token, SECRET) as AccessTokenPayload;
  } catch {
    throw new Error("Invalid or expired access token");
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  try {
    return jwt.verify(token, SECRET) as RefreshTokenPayload;
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
}
