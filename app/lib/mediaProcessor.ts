import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function generateFilename(original: string): string {
  return `${randomUUID()}${path.extname(original)}`;
}

export function bytesToMB(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

export function getKind(mime: string): "image" | "video" | "pdf" | "promo" {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime === "application/pdf") return "pdf";
  return "promo";
}