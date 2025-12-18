import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/app/lib/jwt";

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cooky = await cookies();
  const token = cooky.get("accessToken")?.value;

  if (!token) redirect("/auth/seller/login");

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    redirect("/auth/seller/login"); // expired or invalid → refresh should happen via client
  }

  if (payload.role !== "seller") redirect("/unauthorized");

  return <>{children}</>;
}
