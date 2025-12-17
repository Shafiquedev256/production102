"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll for internal sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Optional: Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-3'>
            <img src='/logo.png' alt='ndi bloker' className='h-12 w-auto' />
            <h1
              className={`text-2xl font-bold ${
                scrolled ? "text-dark" : "text-white"
              }`}
            >
              ndi bloker
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8'>
            {[
              { label: "Home", id: "home" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Marketplace", href: "/marketplace" },
              { label: "Sell with Us", id: "sell-with-us" },
              { label: "Affiliate Program", id: "affiliate-program" },
              { label: "Support", id: "support" },
            ].map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors whitespace-nowrap ${
                    scrolled
                      ? "text-dark hover:text-primary"
                      : "text-white hover:text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id!)}
                  className={`font-medium transition-colors whitespace-nowrap ${
                    scrolled
                      ? "text-dark hover:text-primary"
                      : "text-white hover:text-secondary"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className='hidden lg:flex items-center space-x-4'>
            <Link
              href='/seller/login'
              className={`px-6 py-2.5 border-2 border-primary mx-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                scrolled
                  ? "text-dark hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Seller Login
            </Link>
            <Link
              href='/affiliate/login'
              className='px-6 py-2.5 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all whitespace-nowrap'
            >
              Affiliate Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer'
          >
            <i
              className={`ri-menu-line text-2xl ${
                scrolled ? "text-dark" : "text-white"
              }`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden bg-white shadow-lg'>
          <div className='px-6 py-4 space-y-3'>
            {[
              { label: "Home", id: "home" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Marketplace", href: "/marketplace" },
              { label: "Sell with Us", id: "sell-with-us" },
              { label: "Affiliate Program", id: "affiliate-program" },
              { label: "Support", id: "support" },
            ].map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className='block py-2 text-dark hover:text-primary font-medium whitespace-nowrap'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id!)}
                  className='block w-full text-left py-2 text-dark hover:text-primary font-medium whitespace-nowrap'
                >
                  {item.label}
                </button>
              )
            )}
            {/* Mobile CTA Buttons */}
            <div className='pt-4 space-y-2'>
              <Link
                href='/seller/login'
                className='block w-full text-center px-6 py-2.5 border-2 border-primary text-primary rounded-lg font-medium whitespace-nowrap'
              >
                Seller Login
              </Link>
              <Link
                href='/affiliate/login'
                className='block w-full text-center px-6 py-2.5 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-medium whitespace-nowrap'
              >
                Affiliate Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
