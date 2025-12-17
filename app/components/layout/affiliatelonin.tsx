"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function AffiliateLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showResend, setShowResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setShowResend(false);

    try {
      const response = await fetch("/api/auth/affiliate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Login successful! Redirecting...");
        setFormData({ email: "", password: "" });

        setTimeout(() => {
          window.location.href = "/affiliate/dashboard";
        }, 1000);
      } else if (response.status === 403) {
        setErrorMessage(
          data?.message || "Please verify your email before logging in."
        );
        setShowResend(true); // Show the resend button
      } else {
        setErrorMessage(data?.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/auth/affiliate/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          "Verification email resent! Please check your inbox."
        );
        setShowResend(false);
      } else {
        setErrorMessage(
          data?.message || "Failed to resend verification email."
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className='min-h-screen flex flex-col bg-linear-to-br from-orange-50 via-white to-amber-50'>
      <main className='grow flex items-center justify-center px-4 py-16'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl shadow-xl p-8 border border-orange-100'>
            {/* Icon + Title */}
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-linear-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <i className='ri-user-shared-line text-3xl text-white'></i>
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Affiliate Login
              </h1>
              <p className='text-gray-600'>Access your affiliate dashboard</p>
            </div>

            {/* Success/Error Alerts */}
            {successMessage && (
              <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-green-800 text-sm flex items-center'>
                  <i className='ri-checkbox-circle-fill text-lg mr-2'></i>
                  {successMessage}
                </p>
              </div>
            )}
            {errorMessage && (
              <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-800 text-sm flex items-center'>
                  <i className='ri-error-warning-fill text-lg mr-2'></i>
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                    placeholder='john@example.com'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                    placeholder='Enter your password'
                    required
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-linear-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6'
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </button>

                {/* Resend Verification Button */}
                {showResend && (
                  <button
                    type='button'
                    disabled={isResending}
                    onClick={handleResendVerification}
                    className='w-full mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isResending ? "Resending..." : "Resend Verification Email"}
                  </button>
                )}
              </div>
            </form>

            <p className='text-center text-sm text-gray-600 mt-6'>
              Don't have an account?{" "}
              <Link
                href='/affiliate/signup'
                className='text-orange-600 font-semibold'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
