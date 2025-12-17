// hooks/useProtectedSeller.ts
"use client";

import { useSeller } from "./useSeller";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useProtectedSeller = () => {
  const router = useRouter();
  const { data: seller, isLoading, isError } = useSeller();

  useEffect(() => {
    if (!isLoading && (isError || !seller)) {
      router.replace("/seller/login"); // redirect to login if token is invalid/expired
    }
  }, [isLoading, isError, seller, router]);

  return { seller, isLoading };
};
