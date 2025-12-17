import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/app/lib/jwt";

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/auth/seller/login"); // ✅ do NOT wrap in try/catch
  }

  // If the token is invalid, redirect — let the exception propagate
  const payload = verifyAccessToken(token);
  if (payload.role !== "seller") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
