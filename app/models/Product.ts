// lib/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMediaItem {
  url: string;
  filename: string;
  sizeMB: number;
  mimeType: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
  kind: "image" | "video" | "pdf" | "promo";
}

export interface IProduct extends Document {
  sellerId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  currency: string;
  status: "draft" | "published";
  images: IMediaItem[];
  videos: IMediaItem[];
  documents: IMediaItem[];
  stats: { views: number; clicks: number; conversions: number };
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMediaItem>(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
    sizeMB: { type: Number, required: true },
    mimeType: { type: String, required: true },
    thumbnailUrl: String,
    width: Number,
    height: Number,
    durationSeconds: Number,
    kind: {
      type: String,
      enum: ["image", "video", "pdf", "promo"],
      required: true,
    },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    sellerId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    images: { type: [MediaSchema], default: [] },
    videos: { type: [MediaSchema], default: [] },
    documents: { type: [MediaSchema], default: [] },
    stats: {
      views: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
