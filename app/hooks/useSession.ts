"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useSessionGuard() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/session");
      if (res.status === 401) {
        router.replace("/seller/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60_000); // every 1 min

    return () => clearInterval(interval);
  }, [router]);
}
