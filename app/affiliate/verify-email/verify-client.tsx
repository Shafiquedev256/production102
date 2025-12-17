"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyAffiliateEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setStatus("Invalid verification link");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/affiliate/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          router.push("/affiliate/verify-success");
        } else {
          setStatus(data?.message || "Verification failed");
        }
      } catch (error) {
        setStatus("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className='flex items-center justify-center h-screen text-xl'>
      {loading ? "Verifying..." : status}
    </div>
  );
}
