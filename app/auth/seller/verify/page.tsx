import { Suspense } from "react";
import VerifySellerClient from "./verify-client";

export const dynamic = "force-dynamic";

export default function VerifySellerPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center h-screen text-xl'>
          Verifying...
        </div>
      }
    >
      <VerifySellerClient />
    </Suspense>
  );
}
