"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-linear-to-br from-orange-600 via-amber-500 to-yellow-500 text-white'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12'>
          {/* Logo and Countries */}
          <div className='lg:col-span-1'>
            <Link href='/' className='flex items-center space-x-3 mb-4'>
              <img src='/logo.png' alt='NDI Bloker' className='h-12 w-auto' />
            </Link>
            <p className='text-white/90 mb-4 leading-relaxed'>
              Connecting sellers and affiliates across Africa
            </p>
            <div className='flex flex-wrap gap-2'>
              <span className='text-2xl' title='Uganda'>
                🇺🇬
              </span>
              <span className='text-2xl' title='Kenya'>
                🇰🇪
              </span>
              <span className='text-2xl' title='Tanzania'>
                🇹🇿
              </span>
              <span className='text-2xl' title='Rwanda'>
                🇷🇼
              </span>
              <span className='text-2xl' title='Nigeria'>
                🇳🇬
              </span>
              <span className='text-2xl' title='Ghana'>
                🇬🇭
              </span>
              <span className='text-2xl' title='South Africa'>
                🇿🇦
              </span>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Marketplace</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/marketplace'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href='/marketplace'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href='/marketplace'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href='/marketplace'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers Links */}
          <div>
            <h4 className='font-bold text-lg mb-4'>For Sellers</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/seller-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href='/seller-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  List Product
                </Link>
              </li>
              <li>
                <Link
                  href='/seller-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href='/seller-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Payouts
                </Link>
              </li>
            </ul>
          </div>

          {/* For Affiliates Links */}
          <div>
            <h4 className='font-bold text-lg mb-4'>For Affiliates</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/affiliate-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Join Program
                </Link>
              </li>
              <li>
                <Link
                  href='/affiliate-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  My Links
                </Link>
              </li>
              <li>
                <Link
                  href='/affiliate-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Earnings
                </Link>
              </li>
              <li>
                <Link
                  href='/affiliate-dashboard'
                  className='text-white/90 hover:text-white transition-colors'
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Stay Updated</h4>
            <p className='text-white/90 mb-4 text-sm'>
              Get the latest products and offers
            </p>
            <div className='flex'>
              <input
                type='email'
                placeholder='Your email'
                className='flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-l-lg text-white placeholder-white/60 focus:outline-none focus:bg-white/30 text-sm'
              />
              <button className='px-6 py-2 bg-dark hover:bg-dark-light text-white rounded-r-lg font-medium transition-colors whitespace-nowrap'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className='border-t border-white/20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-8'>
          <div className='flex flex-wrap items-center justify-between gap-8'>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-white/80'>We Accept:</span>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 flex items-center justify-center bg-white/20 rounded cursor-pointer hover:bg-white/30 transition-colors'>
                  <i className='ri-bank-card-line text-xl'></i>
                </div>
                <div className='w-10 h-10 flex items-center justify-center bg-white/20 rounded cursor-pointer hover:bg-white/30 transition-colors'>
                  <i className='ri-smartphone-line text-xl'></i>
                </div>
                <div className='w-10 h-10 flex items-center justify-center bg-white/20 rounded cursor-pointer hover:bg-white/30 transition-colors'>
                  <i className='ri-wallet-3-line text-xl'></i>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-6'>
              <div className='flex items-center space-x-2'>
                <i className='ri-shield-check-line text-2xl'></i>
                <span className='text-sm'>Secure</span>
              </div>
              <div className='flex items-center space-x-2'>
                <i className='ri-verified-badge-line text-2xl'></i>
                <span className='text-sm'>Verified</span>
              </div>
              <div className='flex items-center space-x-2'>
                <i className='ri-lock-line text-2xl'></i>
                <span className='text-sm'>Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Social Links */}
      <div className='border-t border-white/20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-white/80 text-sm'>
              © 2025 NDI Bloker. All rights reserved.
            </p>

            {/* Social Media */}
            <div className='flex items-center space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center border-2 border-white/30 rounded-full hover:bg-white hover:text-primary transition-all cursor-pointer'
              >
                <i className='ri-facebook-fill'></i>
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center border-2 border-white/30 rounded-full hover:bg-white hover:text-primary transition-all cursor-pointer'
              >
                <i className='ri-instagram-line'></i>
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center border-2 border-white/30 rounded-full hover:bg-white hover:text-primary transition-all cursor-pointer'
              >
                <i className='ri-twitter-x-line'></i>
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center border-2 border-white/30 rounded-full hover:bg-white hover:text-primary transition-all cursor-pointer'
              >
                <i className='ri-linkedin-fill'></i>
              </a>
            </div>

            {/* Legal */}
            <div className='flex items-center space-x-4 text-sm'>
              <a
                href='#'
                className='text-white/80 hover:text-white transition-colors'
              >
                Terms
              </a>
              <span className='text-white/40'>|</span>
              <a
                href='#'
                className='text-white/80 hover:text-white transition-colors'
              >
                Privacy
              </a>
              <span className='text-white/40'>|</span>
              <a
                href='#'
                className='text-white/80 hover:text-white transition-colors'
              >
                Cookies
              </a>
              <span className='text-white/40'>|</span>
              <a
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/80 hover:text-white transition-colors'
              >
                shafiq
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
