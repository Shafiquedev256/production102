import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/app/lib/jwt";

export default async function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cooky = await cookies();
  const token = cooky.get("token")?.value;

  if (!token) redirect("/auth/affiliate/login");

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    redirect("/auth/affiliate/login"); // expired or invalid → refresh should happen via client
  }

  if (payload.role !== "affiliate") redirect("/unauthorized");

  return <>{children}</>;
}
