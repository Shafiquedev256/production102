"use client";

import { Card } from "../ui/card";

const features = [
  {
    icon: "ri-store-3-line",
    title: "Multi-Vendor Marketplace",
    description:
      "Connect with verified sellers across Africa offering quality products in multiple categories.",
  },
  {
    icon: "ri-links-line",
    title: "Affiliate Program",
    description:
      "Earn generous commissions by promoting products. Track your earnings in real-time.",
  },
  {
    icon: "ri-wallet-3-line",
    title: "Multi-Currency Wallet",
    description:
      "Secure wallet supporting UGX, KES, TZS, NGN, GHS, ZAR, MAD, and USD with instant transfers.",
  },
  {
    icon: "ri-shield-check-line",
    title: "AI Fraud Detection",
    description:
      "Advanced AI monitors transactions and accounts to ensure a safe marketplace for everyone.",
  },
  {
    icon: "ri-line-chart-line",
    title: "Real-Time Analytics",
    description:
      "Comprehensive dashboards for sellers and affiliates to track performance and optimize sales.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 Support",
    description:
      "Dedicated support team available around the clock to assist with any questions or issues.",
  },
];

export default function FeaturesSection() {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Why Choose AfriMarket?
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Built for Africa, powered by innovation. Experience the future of
            e-commerce.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='text-center p-8 bg-white hover:shadow-xl transition-shadow rounded-2xl'
            >
              <div className='w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md'>
                <i className={`${feature.icon} text-4xl text-white`} />
              </div>

              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                {feature.title}
              </h3>

              <p className='text-gray-600 leading-relaxed'>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
