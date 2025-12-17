"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Overview from "./Overview";
import UserManagement from "./UserManagement";
import CampaignOversight from "./CampaignOversight";
import FraudDetection from "./FraudDetection";
import Financials from "./Financials";
import AuditLogs from "./AuditLogs";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "users":
        return <UserManagement />;
      case "campaigns":
        return <CampaignOversight />;
      case "fraud":
        return <FraudDetection />;
      case "financials":
        return <Financials />;
      case "audit":
        return <AuditLogs />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header setSidebarOpen={setSidebarOpen} />

        <main className='flex-1 overflow-y-auto'>
          <div className='px-4 py-6 lg:px-8'>{renderSection()}</div>
        </main>
      </div>
    </div>
  );
}
