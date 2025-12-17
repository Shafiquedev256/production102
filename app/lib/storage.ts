// lib/storage.ts
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const UPLOADS_ROOT = path.join(process.cwd(), "uploads");

export async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

export function safeFilename(originalName: string) {
  const ext = path.extname(originalName || "").toLowerCase() || "";
  const base = uuidv4();
  return `${base}${ext}`;
}
