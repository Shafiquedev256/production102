"use client";

import { useState } from "react";
import Sidebar from "@/app/components/dashboard/affiliate/topnav";
import Overview from "@/app/components/dashboard/affiliate/overview";
import RealTimeActivity from "@/app/components/dashboard/affiliate/realtimeActivity";
import LinkManagement from "@/app/components/dashboard/affiliate/linkManagement";
import Header from "@/app/components/dashboard/affiliate/Header";

const AffiliateDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isOpen, setIsOpen] = useState(true);

  // Only render the active section
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "realtime":
        return <RealTimeActivity />;
      case "links":
        return <LinkManagement />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content */}
      <main className='flex-1 p-6 lg:p-10'>
        <div className='max-w-6xl mx-auto flex flex-col'>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AffiliateDashboard;
