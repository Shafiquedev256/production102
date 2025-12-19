"use client";
import Image from "next/image";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
    { id: "products", label: "Products", icon: "ri-shopping-bag-line" },
    { id: "analytics", label: "Analytics", icon: "ri-line-chart-line" },
    { id: "payments", label: "Payments", icon: "ri-wallet-line" },
    { id: "settings", label: "Settings", icon: "ri-settings-3-line" },
    { id: "support", label: "Support", icon: "ri-customer-service-line" },
  ];

  const handleMenuClick = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className='flex flex-col h-full'>
        {/* Logo */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200'>
          <div className='relative w-32 h-10'>
            <Image src='/logo.png' alt='Logo' fill className='object-contain' />
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer'
          >
            <i className='ri-close-line text-2xl'></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all whitespace-nowrap cursor-pointer ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className='font-medium'>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className='px-4 py-4 border-t border-gray-200'>
          <div className='flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold'>
              JD
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold text-gray-800 truncate'>
                John Doe
              </p>
              <p className='text-xs text-gray-600 truncate'>john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
