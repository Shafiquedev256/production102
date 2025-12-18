"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/auth/seller/logout", {
        method: "POST",
        credentials: "include", // important for HttpOnly cookies
      });

      if (res.ok) {
        // Redirect to home page after logout
        router.push("/");
      } else {
        console.error("Logout failed");
        alert("Logout failed. Please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Server error. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`px-4 py-2 rounded-lg font-semibold transition 
        ${isLoggingOut ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
