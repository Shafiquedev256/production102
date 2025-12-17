// models/Affiliate.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPayout {
  payoutId: string;
  amount: number;
  status: "pending" | "processing" | "paid" | "failed";
  createdAt: Date;
  paidAt?: Date;
}

export interface IPayoutMethod {
  type: "mobile_money" | "bank" | "crypto";
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  momoNetwork?: string; // Airtel, MTN, etc.
  walletAddress?: string;
}

export interface IKycDocument {
  type: string;
  url: string;
  uploadedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
}

export interface ITrafficSource {
  source: string;
  clicks: number;
  conversions: number;
  createdAt: Date;
}

export interface ISuspiciousActivity {
  type: string;
  message: string;
  createdAt: Date;
}

export interface IStats {
  clicks: number;
  conversions: number;
  sales: number;
  conversionRate: number;
  totalLeads: number;
}

export interface IAffiliate extends Document {
  affiliateId: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  bio?: string;

  status: "pending" | "active" | "suspended" | "banned";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  phoneVerificationCode?: string;
  phoneVerificationExpires?: Date;

  lastLoginAt?: Date;
  lastLoginIp?: string;
  failedLoginAttempts: number;
  lastFailedLoginAt?: Date;

  kycStatus: "none" | "submitted" | "approved" | "rejected";
  kycDocuments: IKycDocument[];

  commissionRate: number;
  totalEarnings: number;
  pendingPayout: number;
  lifetimeWithdrawn: number;

  payoutMethod?: IPayoutMethod;
  payouts: IPayout[];

  referredBy?: string;
  referralCode: string;
  referrals: string[];
  referralTier: number;

  stats: IStats;

  trafficSources: ITrafficSource[];
  riskScore: number;
  flaggedReasons: string[];
  suspiciousIps: string[];
  suspiciousActivities: ISuspiciousActivity[];

  apiKey: string;
  apiKeyCreatedAt: Date;
  apiKeyLastUsedAt?: Date;
  apiRequestCount: number;

  rateLimiter: {
    windowStart: Date;
    requestCount: number;
  };

  refreshTokenVersion: number; // for refresh token validation

  createdAt: Date;
  updatedAt: Date;
}

const PayoutSchema = new Schema<IPayout>(
  {
    payoutId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "paid", "failed"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    paidAt: Date,
  },
  { _id: false }
);

const KycDocumentSchema = new Schema<IKycDocument>(
  {
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    approvedAt: Date,
    rejectedAt: Date,
  },
  { _id: false }
);

const TrafficSourceSchema = new Schema<ITrafficSource>(
  {
    source: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const SuspiciousActivitySchema = new Schema<ISuspiciousActivity>(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const StatsSchema = new Schema<IStats>(
  {
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    totalLeads: { type: Number, default: 0 },
  },
  { _id: false }
);

const PayoutMethodSchema = new Schema<IPayoutMethod>(
  {
    type: {
      type: String,
      enum: ["mobile_money", "bank", "crypto"],
      required: true,
    },
    accountName: String,
    accountNumber: String,
    bankName: String,
    momoNetwork: String,
    walletAddress: String,
  },
  { _id: false }
);

const AffiliateSchema = new Schema<IAffiliate>(
  {
    affiliateId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    avatar: String,
    bio: String,

    status: {
      type: String,
      enum: ["pending", "active", "suspended", "banned"],
      default: "pending",
    },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    phoneVerificationCode: String,
    phoneVerificationExpires: Date,

    lastLoginAt: Date,
    lastLoginIp: String,
    failedLoginAttempts: { type: Number, default: 0 },
    lastFailedLoginAt: Date,

    kycStatus: {
      type: String,
      enum: ["none", "submitted", "approved", "rejected"],
      default: "none",
    },
    kycDocuments: [KycDocumentSchema],

    commissionRate: { type: Number, default: 10 },
    totalEarnings: { type: Number, default: 0 },
    pendingPayout: { type: Number, default: 0 },
    lifetimeWithdrawn: { type: Number, default: 0 },

    payoutMethod: PayoutMethodSchema,
    payouts: [PayoutSchema],

    referredBy: String,
    referralCode: { type: String, required: true },
    referrals: { type: [String], default: [] },
    referralTier: { type: Number, default: 1 },

    stats: StatsSchema,
    trafficSources: [TrafficSourceSchema],

    riskScore: { type: Number, default: 0 },
    flaggedReasons: { type: [String], default: [] },
    suspiciousIps: { type: [String], default: [] },
    suspiciousActivities: [SuspiciousActivitySchema],

    apiKey: { type: String, required: true },
    apiKeyCreatedAt: { type: Date, default: Date.now },
    apiKeyLastUsedAt: Date,
    apiRequestCount: { type: Number, default: 0 },

    rateLimiter: {
      windowStart: { type: Date, default: Date.now },
      requestCount: { type: Number, default: 0 },
    },

    refreshTokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Affiliate ||
  mongoose.model<IAffiliate>("Affiliate", AffiliateSchema);
