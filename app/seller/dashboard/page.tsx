"use client";
import Analytics from "../../components/dashboard/seller/Analytics";
import Header from "../../components/dashboard/seller/Header";
import Overview from "../../components/dashboard/seller/overview";
import Payments from "../../components/dashboard/seller/Payments";
import Products from "../../components/dashboard/seller/product";
import Sidebar from "../../components/dashboard/seller/Sidebar";
import { useProtectedSeller } from "../../hooks/useProtectedSeller";
import { useState } from "react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { seller, isLoading, isError } = useProtectedSeller();

  const renderSection = () => {
    if (isLoading) {
      return (
        <div className='flex items-center justify-center h-64'>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
            <p className='text-gray-600 text-sm'>Loading your dashboard...</p>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className='flex items-center justify-center h-64'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md'>
            <div className='flex items-center gap-3 mb-2'>
              <i className='ri-error-warning-line text-2xl text-red-600'></i>
              <h3 className='text-lg font-bold text-red-800'>
                Error Loading Data
              </h3>
            </div>
          </div>
        </div>
      );
    }

    if (!seller) {
      return (
        <div className='flex items-center justify-center h-64'>
          <p className='text-gray-600'>No seller data available</p>
        </div>
      );
    }

    switch (activeSection) {
      case "overview":
        return <Overview seller={seller} />;
      case "products":
        return <Products seller={seller} />;
      case "analytics":
        return <Analytics seller={seller} />;
      case "payments":
        return <Payments seller={seller} />;
      default:
        return <Overview seller={seller} />;
    }
  };

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header setIsSidebarOpen={setIsSidebarOpen} seller={seller} />

        <main className='flex-1 overflow-y-auto'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
            {renderSection()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
