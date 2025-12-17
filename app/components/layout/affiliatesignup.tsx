"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

export default function AffiliateSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    // --------------------------
    // Client-side validation
    // --------------------------
    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (formData.password.length < 8) {
      setAlert({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/affiliate/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        setAlert({
          type: "success",
          message: "Account created! Check your email to verify your account.",
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        return;
      }

      // Backend error
      const message =
        result.message ||
        result.error ||
        result?.errors?.email?.[0] ||
        "Signup failed. Please try again.";

      setAlert({ type: "error", message });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Server error. Try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-linear-to-br from-orange-50 via-white to-amber-50'>
      <main className='grow flex items-center justify-center px-4 py-16'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl shadow-xl p-8 border border-orange-100'>
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-linear-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <i className='ri-user-star-line text-3xl text-white'></i>
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Join as Affiliate
              </h1>
              <p className='text-gray-600'>
                Create your account and start earning
              </p>
            </div>

            {/* Alerts */}
            {alert && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  alert.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className='text-sm flex items-center'>
                  <i
                    className={`${
                      alert.type === "success"
                        ? "ri-checkbox-circle-fill"
                        : "ri-error-warning-fill"
                    } text-lg mr-2`}
                  ></i>
                  {alert.message}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                    placeholder='John Doe'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                    placeholder='Minimum 8 characters'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                    placeholder='Re-enter your password'
                    required
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-linear-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6'
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </form>

            <p className='text-center text-sm text-gray-600 mt-6'>
              Already have an account?{" "}
              <Link
                href='/affiliate/login'
                className='text-orange-600 font-semibold'
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
