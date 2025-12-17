import { Suspense } from "react";
import VerifyAffiliateEmail from "./verify-client";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center h-screen text-xl'>
          Verifying...
        </div>
      }
    >
      <VerifyAffiliateEmail />
    </Suspense>
  );
}
