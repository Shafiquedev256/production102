"use client";

import { useState } from "react";
import Sidebar from "@/app/components/dashboard/seller/sedebar";
import { useProtectedSeller } from "@/app/hooks/useProtectedSeller";
import DashboardOverview from "@/app/components/dashboard/seller/dashboardoverview";
import RealTimeMetrics from "@/app/components/dashboard/seller/realtimemetrics";
import ProductsCampaigns from "@/app/components/dashboard/seller/productsCampaign";
import ReportsAnalytics from "@/app/components/dashboard/seller/reportandanalysis";
import PayoutsManagement from "@/app/components/dashboard/seller/payAndAfiliateManagement";
import ContentHub from "@/app/components/dashboard/seller/ContentHub";
import SystemSettings from "@/app/components/dashboard/seller/systemsetting";
import Header from "@/app/components/dashboard/seller/header";

const SellerDashboard = () => {
  const { seller, isLoading } = useProtectedSeller();
  const [activeSection, setActiveSection] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);

  // FUNCTION TO RENDER ACTIVE SECTION
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "metrics":
        return <RealTimeMetrics />;
      case "products":
        return <ProductsCampaigns />;
      case "reports":
        return <ReportsAnalytics />;
      case "payouts":
        return <PayoutsManagement />;
      case "content":
        return <ContentHub />;
      case "settings":
        return <SystemSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* HEADER */}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className='flex pt-16'>
        {/* SIDEBAR */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* MAIN CONTENT */}
        <main className='flex-1 p-6 lg:p-10'>
          <div>
            <h1>Welcome, {seller?.fullName}</h1>
            <p>Your Seller ID: {seller?.sellerId}</p>
          </div>
          <div className='max-w-5xl mx-auto'>{renderSection()}</div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
