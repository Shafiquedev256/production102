"use client";
import { useSeller } from "./useSeller";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useProtectedSeller = () => {
  const router = useRouter();
  const { data: seller, isLoading, isError, refetch } = useSeller();

  useEffect(() => {
    if (!isLoading && (isError || !seller)) {
      router.replace("/auth/seller/login");
    }
  }, [isLoading, isError, seller, router]);

  return { seller, isLoading, refetch };
};
