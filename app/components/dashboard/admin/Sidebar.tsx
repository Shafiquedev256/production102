"use client";

import React from "react";

type SidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function Sidebar({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const menuItems: { id: string; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
    { id: "users", label: "User Management", icon: "ri-user-settings-line" },
    { id: "campaigns", label: "Campaigns", icon: "ri-megaphone-line" },
    { id: "fraud", label: "Fraud Detection", icon: "ri-shield-check-line" },
    {
      id: "financials",
      label: "Financials",
      icon: "ri-money-dollar-circle-line",
    },
    { id: "audit", label: "Audit Logs", icon: "ri-file-list-3-line" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-20 lg:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-200'>
            <img
              src='https://public.readdy.ai/ai/img_res/04b4216b-22f5-4293-a7f2-8518b200f81b.png'
              alt='Logo'
              className='w-10 h-10 object-contain'
            />
            <span className='text-lg font-bold text-gray-900'>Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-1 overflow-y-auto'>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  text-sm font-medium transition-all whitespace-nowrap cursor-pointer
                  ${
                    activeSection === item.id
                      ? "bg-teal-50 text-teal-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <i
                  className={`${item.icon} text-lg w-5 h-5 flex items-center justify-center`}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className='px-6 py-4 border-t border-gray-200'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center'>
                <i className='ri-admin-line text-teal-600 text-lg' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  Admin User
                </p>
                <p className='text-xs text-gray-500 truncate'>
                  admin@platform.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
