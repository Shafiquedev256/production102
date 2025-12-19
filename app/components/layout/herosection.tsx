"use client";

import Link from "next/link";

export default function HeroSection() {
  const countries = [
    { name: "Uganda", flag: "🇺🇬" },
    { name: "Kenya", flag: "🇰🇪" },
    { name: "Tanzania", flag: "🇹🇿" },
    { name: "Rwanda", flag: "🇷🇼" },
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "South Africa", flag: "🇿🇦" },
  ];

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center overflow-hidden'
    >
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <img
          src='/7b7b93d3ff2fe933552d16e07831d5f3.jpg'
          alt='African Marketplace'
          className='w-full h-full object-cover object-top'
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/50'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32'>
        <div className='grid lg:grid-cols-5 gap-12 items-center'>
          {/* Left Column */}
          <div className='lg:col-span-3 text-white'>
            <div className='space-y-6'>
              <h2 className='font-display text-6xl lg:text-7xl font-black leading-tight'>
                Sell Smarter,
              </h2>
              <h2 className='font-display text-6xl lg:text-7xl font-light leading-tight'>
                Earn Together
              </h2>

              <p className='text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed mt-4'>
                Africa's premier marketplace connecting sellers and affiliates
                across 7 countries. List your products, generate affiliate
                links, and grow your business together.
              </p>

              {/* Action Buttons */}
              <div className='flex flex-wrap gap-4 pt-4'>
                <Link
                  href='/auth/seller/signup'
                  className='px-8 py-4 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap'
                >
                  Start Selling
                </Link>

                <Link
                  href='/auth/affiliate/signup'
                  className='px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-dark transition-all whitespace-nowrap'
                >
                  Become an Affiliate
                </Link>
              </div>

              {/* Statistics Bar */}
              <div className='flex flex-wrap gap-6 pt-8'>
                {[
                  { value: "50K+", label: "Products" },
                  { value: "10K+", label: "Sellers" },
                  { value: "25K+", label: "Affiliates" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className='px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20'
                  >
                    <p className='text-2xl font-bold'>{item.value}</p>
                    <p className='text-sm text-gray-200'>{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Country Flags */}
              <div className='flex flex-wrap gap-3 pt-4'>
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className='flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20'
                    title={country.name}
                  >
                    <span className='text-2xl'>{country.flag}</span>
                    <span className='text-sm font-medium'>{country.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Floating Cards */}
          <div className='lg:col-span-2 hidden lg:block'>
            <div className='relative h-96'>
              {/* Card 1 */}
              <div className='absolute top-0 right-0 w-64 bg-white rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300 overflow-hidden border-2 border-primary'>
                <img
                  src='/art.jpg'
                  alt='Product'
                  className='w-full h-40 object-cover object-top'
                />
                <div className='p-4'>
                  <h4 className='font-bold text-dark'>African Crafts</h4>
                  <p className='text-sm text-gray-500'>Earn $15 per sale</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className='absolute top-20 right-20 w-64 bg-white rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden border-2 border-primary'>
                <img
                  src='/fashion.jpg'
                  alt='Product'
                  className='w-full h-40 object-cover object-top'
                />
                <div className='p-4'>
                  <h4 className='font-bold text-dark'>Fashion Items</h4>
                  <p className='text-sm text-gray-500'>Earn $25 per sale</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className='absolute top-40 right-10 w-64 bg-white rounded-3xl shadow-2xl transform rotate-8 hover:rotate-0 transition-transform duration-300 overflow-hidden border-2 border-primary'>
                <img
                  src='/electonic.jpg'
                  alt='Product'
                  className='w-full h-40 object-cover object-top'
                />
                <div className='p-4'>
                  <h4 className='font-bold text-dark'>Electronics</h4>
                  <p className='text-sm text-gray-500'>Earn $50 per sale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2'>
          <div className='w-1 h-3 bg-white rounded-full animate-bounce'></div>
        </div>
      </div>
    </section>
  );
}
