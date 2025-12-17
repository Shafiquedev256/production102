"use client";

import Link from "next/link";

export default function AffiliateProgramSection() {
  const earningsData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100];

  return (
    <section
      id='affiliate-program'
      className='py-24 bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden'
    >
      {/* Background Blurs */}
      <div className='absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl'></div>

      <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='font-display text-5xl lg:text-6xl font-bold text-white mb-6'>
            Join Africa&apos;s Largest
            <br />
            Affiliate Network
          </h2>
          <p className='text-xl text-gray-200 max-w-3xl mx-auto'>
            Turn your influence into income. Promote products you love and earn
            generous commissions on every sale.
          </p>
        </div>

        {/* Feature Cards */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {[
            {
              icon: "ri-money-dollar-circle-line",
              title: "High Commissions",
              description:
                "Earn up to 30% commission on every sale you generate",
              value: "30%",
            },
            {
              icon: "ri-time-line",
              title: "Instant Tracking",
              description:
                "Real-time analytics showing clicks, conversions, and earnings",
              value: "Real-time",
            },
            {
              icon: "ri-wallet-3-line",
              title: "Fast Payouts",
              description: "Get paid weekly via mobile money or bank transfer",
              value: "Weekly",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105'
            >
              <div className='w-16 h-16 flex items-center justify-center bg-linear-to-br from-primary to-secondary rounded-2xl mb-6'>
                <i className={`${item.icon} text-4xl text-white`}></i>
              </div>
              <h3 className='text-2xl font-bold text-white mb-3'>
                {item.title}
              </h3>
              <p className='text-gray-200 mb-4 leading-relaxed'>
                {item.description}
              </p>
              <div className='text-6xl font-black text-primary'>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Affiliate Dashboard Preview */}
        <div className='relative max-w-5xl mx-auto mb-16'>
          <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl'>
            <div className='bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6'>
              {/* Header */}
              <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-700'>
                <h4 className='text-white font-bold text-xl'>
                  Affiliate Dashboard
                </h4>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                  <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                  <div className='w-3 h-3 bg-success rounded-full'></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                <div className='bg-linear-to-br from-primary to-secondary rounded-xl p-4'>
                  <p className='text-white/80 text-sm mb-1'>Total Earnings</p>
                  <p className='text-white font-bold text-2xl'>$3,847</p>
                </div>
                <div className='bg-linear-to-br from-success to-emerald-600 rounded-xl p-4'>
                  <p className='text-white/80 text-sm mb-1'>This Month</p>
                  <p className='text-white font-bold text-2xl'>$1,234</p>
                </div>
                <div className='bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl p-4'>
                  <p className='text-white/80 text-sm mb-1'>Total Clicks</p>
                  <p className='text-white font-bold text-2xl'>12.5K</p>
                </div>
                <div className='bg-linear-to-br from-purple-500 to-pink-500 rounded-xl p-4'>
                  <p className='text-white/80 text-sm mb-1'>Conversions</p>
                  <p className='text-white font-bold text-2xl'>487</p>
                </div>
              </div>

              {/* Earnings Overview */}
              <div className='bg-gray-800/50 rounded-xl p-6 mb-6'>
                <h5 className='text-white font-semibold mb-4'>
                  Earnings Overview
                </h5>
                <div className='h-48 flex items-end justify-between space-x-2'>
                  {earningsData.map((height, idx) => (
                    <div
                      key={idx}
                      className='flex-1 bg-linear-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80 cursor-pointer'
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                <button className='px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors whitespace-nowrap'>
                  Generate Link
                </button>
                <button className='px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap'>
                  View Products
                </button>
                <button className='px-4 py-3 bg-success hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap'>
                  Request Payout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className='text-center'>
          <Link
            href='/affiliate-dashboard'
            className='inline-flex items-center px-12 py-5 bg-white text-dark rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all animate-pulse whitespace-nowrap'
          >
            Start Earning Today
            <i className='ri-arrow-right-line ml-3 text-2xl'></i>
          </Link>
          <p className='text-white/80 mt-6'>
            No fees to join. Start promoting in minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
