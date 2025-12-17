// hooks/useSeller.ts
import { useQuery } from "@tanstack/react-query";

export interface ISeller {
  sellerId: string;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  currency: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: "pending" | "active" | "suspended" | "banned";
  failedLoginAttempts: number;
  lastFailedLoginAt?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  kycStatus: "none" | "submitted" | "approved" | "rejected";
  kycDocuments: {
    docType: string;
    url: string;
    uploadedAt: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
  }[];
  allowAffiliateAutoAccess: boolean;
  defaultCommissionRate: number;
  payoutThreshold: number;
  uploadLimits: {
    maxProducts: number;
    maxVideosPerProduct: number;
    maxImagesPerProduct: number;
    maxVideoSizeMB: number;
    maxImageSizeMB: number;
  };
  totalProducts: number;
  totalOrders: number;
  totalEarnings: number;
  pendingPayout: number;
  views: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  storageUsedMB: number;
  storageLimitMB: number;
  apiKey?: string;
  apiKeyCreatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const useSeller = () => {
  return useQuery<ISeller, Error>({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch("/api/seller/details");
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch seller");
      }
      return data.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes cache
    refetchOnWindowFocus: false,
  });
};
