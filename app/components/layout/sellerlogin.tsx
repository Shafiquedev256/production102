"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function SellerLoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendStatus, setResendStatus] = useState<"success" | "error" | null>(
    null
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setMessage("");
    setShowResend(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/seller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitStatus("success");
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/seller/dashboard"), 1000);
      } else if (res.status === 403) {
        setSubmitStatus("error");
        setMessage("Email not verified. Please verify first.");
        setShowResend(true);
      } else {
        setSubmitStatus("error");
        setMessage(result.message || "Invalid login credentials.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setMessage("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await fetch("/api/auth/seller/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      setResendStatus(res.ok ? "success" : "error");
    } catch {
      setResendStatus("error");
    }
  };

  return (
    <main className='grow flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-orange-100'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-linear-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <i className='ri-store-2-line text-3xl text-white'></i>
            </div>

            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Welcome Back
            </h1>
            <p className='text-gray-600'>Login to your seller account</p>
          </div>

          {/* Success / Error Alerts */}
          {submitStatus === "success" && (
            <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
              <p className='text-green-800 text-sm flex items-center'>
                <i className='ri-checkbox-circle-fill text-lg mr-2'></i>
                {message}
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-red-800 text-sm flex items-center'>
                <i className='ri-error-warning-fill text-lg mr-2'></i>
                {message}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='email'
              placeholder='Email address'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none'
            />

            <input
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none'
            />

            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-semibold transition 
              ${
                isSubmitting
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Resend Verification */}
          {showResend && (
            <div className='mt-4 text-center'>
              <button
                onClick={handleResend}
                className='text-sm text-orange-600 underline'
              >
                Resend verification email
              </button>

              {resendStatus === "success" && (
                <p className='text-green-600 text-sm mt-2'>
                  Verification email sent!
                </p>
              )}
              {resendStatus === "error" && (
                <p className='text-red-600 text-sm mt-2'>
                  Failed to resend email.
                </p>
              )}
            </div>
          )}

          {/* Footer */}
          <p className='mt-6 text-center text-sm text-gray-600'>
            Don’t have a seller account?{" "}
            <Link
              href='/auth/seller/signup'
              className='text-orange-600 font-semibold hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}