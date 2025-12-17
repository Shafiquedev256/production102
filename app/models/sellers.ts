import mongoose, { Schema, Document } from "mongoose";

export interface ISeller extends Document {
  sellerId: string;

  // Basic Profile
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  currency: string;

  refreshTokenVersion: {
    type: Number;
    default: 0;
  };

  // Verification
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;

  isPhoneVerified: boolean;
  phoneVerificationCode?: string;
  phoneVerificationExpires?: Date;

  status: "pending" | "active" | "suspended" | "banned";

  // Security
  failedLoginAttempts: number;
  lastFailedLoginAt?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;

  // KYC
  kycStatus: "none" | "submitted" | "approved" | "rejected";
  kycDocuments: {
    docType: string;
    url: string;
    uploadedAt: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
  }[];

  // Seller Operational Preferences
  allowAffiliateAutoAccess: boolean;
  defaultCommissionRate: number;
  payoutThreshold: number;

  // Product Upload Support (NEW)
  uploadLimits: {
    maxProducts: number;
    maxVideosPerProduct: number;
    maxImagesPerProduct: number;
    maxVideoSizeMB: number;
    maxImageSizeMB: number;
  };

  // Performance Metrics
  totalProducts: number;
  totalOrders: number;
  totalEarnings: number;
  pendingPayout: number;

  // Affiliate Performance
  views: number;
  clicks: number;
  conversions: number;
  conversionRate: number;

  // Media Storage Quota
  storageUsedMB: number;
  storageLimitMB: number;

  // API Keys
  apiKey?: string;
  apiKeyCreatedAt?: Date;

  // Audit
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema = new Schema<ISeller>(
  {
    sellerId: { type: String, required: true, unique: true },

    /** BASIC INFORMATION */
    businessName: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    phone: { type: String, required: true, unique: true, trim: true },

    country: { type: String, required: true },
    currency: { type: String, required: true }, // UGX, KES, TZS, RWF, NGN, GHS, ZAR

    password: { type: String, required: true },

    /** VERIFICATION */
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    isPhoneVerified: { type: Boolean, default: false },
    phoneVerificationCode: String,
    phoneVerificationExpires: Date,

    status: {
      type: String,
      enum: ["pending", "active", "suspended", "banned"],
      default: "pending",
    },

    /** SECURITY */
    failedLoginAttempts: { type: Number, default: 0 },
    lastFailedLoginAt: Date,
    lastLoginAt: Date,
    lastLoginIp: String,

    /** KYC */
    kycStatus: {
      type: String,
      enum: ["none", "submitted", "approved", "rejected"],
      default: "none",
    },

    kycDocuments: [
      {
        docType: String,
        url: String,
        uploadedAt: Date,
        approvedAt: Date,
        rejectedAt: Date,
      },
    ],

    /** AFFILIATE OPERATIONAL SETTINGS */
    allowAffiliateAutoAccess: { type: Boolean, default: true },
    defaultCommissionRate: { type: Number, default: 10 }, // 10%
    payoutThreshold: { type: Number, default: 50000 }, // default minimum payout in local currency

    /** PRODUCT UPLOAD SUPPORT */
    uploadLimits: {
      type: Object,
      default: {
        maxProducts: 500,
        maxVideosPerProduct: 3,
        maxImagesPerProduct: 6,
        maxVideoSizeMB: 100,
        maxImageSizeMB: 5,
      },
    },

    /** PRODUCT & FINANCIAL STATS */
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    pendingPayout: { type: Number, default: 0 },

    /** AFFILIATE ANALYTICS */
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },

    /** MEDIA STORAGE */
    storageUsedMB: { type: Number, default: 0 },
    storageLimitMB: { type: Number, default: 5000 }, // 5GB per seller, adjustable

    /** API ACCESS */
    apiKey: String,
    apiKeyCreatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Seller ||
  mongoose.model<ISeller>("Seller", SellerSchema);
