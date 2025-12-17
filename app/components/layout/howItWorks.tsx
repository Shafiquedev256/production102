// components/HowItWorksSection.tsx
"use client";

import React from "react";

// TypeScript Interface for better type safety
interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
}

// A helper component to render the icon classes
const Icon = ({ className }: { className: string }) => {
  // Ensure you have RemixIcon imported globally via CSS for these classes to work
  return <i className={`${className}`}></i>;
};

export default function HowItWorksSection() {
  const sellerSteps: Step[] = [
    {
      number: "01",
      icon: "ri-upload-cloud-line",
      title: "List Your Products",
      description:
        "Upload product details, images, and set your affiliate commission rate",
    },
    {
      number: "02",
      icon: "ri-price-tag-3-line",
      title: "Set Commission",
      description:
        "Choose how much affiliates earn per sale to motivate promotion",
    },
    {
      number: "03",
      icon: "ri-team-line",
      title: "Get Promoted",
      description:
        "Affiliates discover and promote your products to their networks",
    },
    {
      number: "04",
      icon: "ri-money-dollar-circle-line",
      title: "Receive Orders",
      description: "Manage orders in your dashboard and verify fulfilled sales",
    },
  ];

  const affiliateSteps: Step[] = [
    {
      number: "01",
      icon: "ri-search-line",
      title: "Browse Products",
      description:
        "Explore thousands of products from verified sellers across Africa",
    },
    {
      number: "02",
      icon: "ri-link",
      title: "Generate Link",
      description:
        "Create your unique affiliate link for any product you want to promote",
    },
    {
      number: "03",
      icon: "ri-share-line",
      title: "Share & Promote",
      description:
        "Share your links on social media, websites, or directly with customers",
    },
    {
      number: "04",
      icon: "ri-wallet-3-line",
      title: "Earn Commission",
      description:
        "Get paid automatically when your referrals make successful purchases",
    },
  ];

  // Reusable Step Card Component
  const StepCard = ({
    step,
    colorClasses,
  }: {
    step: Step;
    colorClasses: { gradient: string; text: string };
  }) => (
    <div
      key={step.title}
      className='flex gap-6 group hover:transform hover:scale-105 transition-all duration-300'
    >
      <div className='shrink-0'>
        <div
          className={`w-20 h-20 rounded-full bg-linear-to-r ${colorClasses.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-2xl transition-shadow`}
        >
          {step.number}
        </div>
      </div>
      <div className='flex-1 pt-2'>
        <div className='w-12 h-12 flex items-center justify-center mb-3'>
          <Icon className={`${step.icon} text-4xl ${colorClasses.text}`} />
        </div>
        <h4 className='text-2xl font-bold text-dark mb-2'>{step.title}</h4>
        <p className='text-gray leading-relaxed'>{step.description}</p>
      </div>
    </div>
  );

  return (
    <section
      id='how-it-works'
      className='py-24 bg-white relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-20 left-10 w-32 h-32 border-4 border-primary rounded-full'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 border-4 border-secondary rotate-45'></div>
        <div className='absolute top-1/2 left-1/4 w-24 h-24 border-4 border-primary rotate-12'></div>
      </div>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
        {/* Section Title */}
        <div className='text-center mb-20'>
          <h2 className='font-display text-5xl lg:text-6xl font-bold text-dark mb-4'>
            Two Ways to{" "}
            <span className='bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>
              Prosper
            </span>
          </h2>
          <p className='text-xl text-gray max-w-3xl mx-auto'>
            Whether you're a seller looking to expand your reach or an affiliate
            wanting to earn commissions, we've got you covered
          </p>
        </div>

        {/* Timeline Grid */}
        <div className='grid lg:grid-cols-2 gap-16'>
          {/* Seller Path */}
          <div className='space-y-8'>
            <div className='text-center mb-12'>
              <div className='inline-block px-6 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg mb-4'>
                For Sellers
              </div>
              <h3 className='text-3xl font-bold text-dark'>
                Grow Your Business
              </h3>
            </div>
            {sellerSteps.map((step) => (
              <StepCard
                key={step.title}
                step={step}
                colorClasses={{
                  gradient: "from-primary to-secondary",
                  text: "text-primary",
                }}
              />
            ))}
          </div>

          {/* Affiliate Path (FIXED COLORS) */}
          <div className='space-y-8'>
            <div className='text-center mb-12'>
              {/* Uses your new custom accent-a/accent-b colors */}
              <div className='inline-block px-6 py-2 bg-linear-to-r from-accent-a to-accent-b text-white rounded-full font-semibold text-lg mb-4'>
                For Affiliates
              </div>
              <h3 className='text-3xl font-bold text-dark'>Start Earning</h3>
            </div>
            {affiliateSteps.map((step) => (
              <StepCard
                key={step.title}
                step={step}
                // Uses your new custom accent-a/accent-b colors
                colorClasses={{
                  gradient: "from-accent-a to-accent-b",
                  text: "text-accent-a",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
