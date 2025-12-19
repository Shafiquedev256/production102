"use client";

import { ISeller } from "@/app/hooks/useSeller";

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  seller: ISeller | undefined;
}

export default function Header({ setIsSidebarOpen, seller }: HeaderProps) {
  return (
    <header className='bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4'>
      <div className='flex items-center justify-between'>
        {/* Left Section */}
        <div className='flex items-center gap-4'>
          {/* Sidebar Toggle for Mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className='lg:hidden text-gray-700 hover:text-gray-900 cursor-pointer'
          >
            <i className='ri-menu-line text-2xl'></i>
          </button>

          {/* Seller Info */}
          <div>
            <h1 className='text-xl sm:text-2xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent'>
              {seller?.businessName || "Seller Dashboard"}
            </h1>
            {seller && (
              <p className='text-xs text-gray-600 mt-0.5'>
                Welcome back, {seller.fullName}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-3 sm:gap-4'>
          {/* Notifications */}
          <button className='relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
            <i className='ri-notification-3-line text-xl'></i>
            <span className='absolute top-1 right-1 w-2 h-2 bg-linear-to-r from-orange-500 to-amber-500 rounded-full'></span>
          </button>

          {/* Add Product Button */}
          <button className='hidden sm:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer'>
            <i className='ri-add-line text-lg'></i>
            <span>Add Product</span>
          </button>
        </div>
      </div>
    </header>
  );
}
