"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifySellerClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setStatus("Invalid verification link. Please check your email.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/seller/verify?token=${token}`, {
          method: "GET",
          cache: "no-store",
        });

        if (res.ok || res.status === 302) {
          router.push("/auth/seller/verify-success");
          return;
        }

        const data = await res.json();
        setStatus(data?.message || "Verification failed. Please try again.");
      } catch (err: any) {
        console.error("Verification error:", err);
        setStatus("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className='flex items-center justify-center h-screen text-xl text-center px-4'>
      {loading ? "Verifying..." : status}
    </div>
  );
}
