"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SellerSignupPage = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setMessage("");

    // Frontend validations
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmitStatus("error");
      setMessage("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (!formData.country) {
      setSubmitStatus("error");
      setMessage("Please select your country.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/seller/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: formData.businessName,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
          country: formData.country,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setMessage(
          result.message ||
            "Account created successfully! Please verify your email."
        );
        setFormData({
          businessName: "",
          fullName: "",
          email: "",
          phone: "",
          country: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
      } else {
        setSubmitStatus("error");
        setMessage(result.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setSubmitStatus("error");
      setMessage("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 py-12 bg-linear-to-br from-orange-50 via-white to-yellow-50'>
      <div className='max-w-2xl w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link href='/' className='inline-block'>
            <img
              src='/logo.png'
              alt='Logo'
              className='h-16 w-auto mx-auto mb-4'
            />
          </Link>
          <h1 className='text-3xl font-bold text-dark mb-2'>
            Start Selling Today
          </h1>
          <p className='text-gray'>
            Create your seller account and reach thousands of customers
          </p>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-8'>
          {/* Status messages */}
          {submitStatus && message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Business Name */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Business Name
              </label>
              <input
                type='text'
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm'
                placeholder='Your Business Name'
                required
              />
            </div>

            {/* Full Name */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Full Name
              </label>
              <input
                type='text'
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm'
                placeholder='John Doe'
                required
              />
            </div>

            {/* Email + Phone */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm'
                  placeholder='seller@example.com'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm'
                  placeholder='+256 700 000 000'
                  required
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer'
                required
              >
                <option value=''>Select your country</option>
                <option value='uganda'>🇺🇬 Uganda</option>
                <option value='kenya'>🇰🇪 Kenya</option>
                <option value='tanzania'>🇹🇿 Tanzania</option>
                <option value='rwanda'>🇷🇼 Rwanda</option>
                <option value='nigeria'>🇳🇬 Nigeria</option>
                <option value='ghana'>🇬🇭 Ghana</option>
                <option value='south-africa'>🇿🇦 South Africa</option>
              </select>
            </div>

            {/* Passwords */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm'
                  placeholder='Create password'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm'
                  placeholder='Confirm password'
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className='flex items-start'>
              <input
                type='checkbox'
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className='w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1 cursor-pointer'
                required
              />
              <label className='ml-3 text-sm text-dark cursor-pointer'>
                I agree to the{" "}
                <a href='#' className='text-primary font-semibold'>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href='#' className='text-primary font-semibold'>
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? "Creating account..." : "Create Seller Account"}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <Link
              href='/auth/seller/login'
              className='text-sm text-gray hover:text-dark'
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignupPage;
