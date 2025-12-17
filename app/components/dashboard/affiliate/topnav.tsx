"use client";

import Image from "next/image";
import { FC } from "react";

export interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isOpen,
}) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
    { id: "realtime", label: "Real-time Activity", icon: "ri-pulse-line" },
    { id: "links", label: "Link Management", icon: "ri-links-line" },
    {
      id: "earnings",
      label: "Earnings & Payouts",
      icon: "ri-money-dollar-circle-line",
    },
    {
      id: "analytics",
      label: "Analytics & Campaigns",
      icon: "ri-bar-chart-box-line",
    },
    { id: "account", label: "Account & Help", icon: "ri-user-settings-line" },
  ];

  return (
    <aside
      className={`
        ${isOpen ? "w-64" : "w-0"}
        bg-white border-r border-gray-200
        transition-all duration-300 overflow-hidden 
        flex flex-col h-screen fixed md:static z-40
      `}
    >
      {/* Logo Section */}
      <div className='p-6 border-b border-gray-200 flex items-center gap-3'>
        <Image
          src='/logo.png'
          alt='Logo'
          width={40}
          height={40}
          className='object-contain'
        />

        <div>
          <h1 className='text-lg font-bold text-gray-900'>Affiliate Pro</h1>
          <p className='text-xs text-gray-500'>Dashboard</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg 
              text-sm font-medium transition-all cursor-pointer 
              ${
                activeSection === item.id
                  ? "bg-teal-50 text-teal-600"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            <i className={`${item.icon} text-lg`} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Achievement Card */}
      <div className='p-4 border-t border-gray-200'>
        <div className='bg-linear-to-br from-teal-500 to-teal-600 rounded-lg p-4 text-white'>
          <div className='flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg mb-3'>
            <i className='ri-trophy-line text-xl'></i>
          </div>

          <h3 className='font-semibold text-sm mb-1'>Level Up!</h3>
          <p className='text-xs text-teal-50 mb-3'>
            Earn 5 more sales to reach Gold tier
          </p>

          <div className='w-full bg-white/20 rounded-full h-2'>
            <div
              className='bg-white rounded-full h-2'
              style={{ width: "65%" }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
