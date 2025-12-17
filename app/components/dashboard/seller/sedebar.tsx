// Sidebar.tsx

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: "ri-dashboard-line" },
    { id: "metrics", label: "Real-Time Metrics", icon: "ri-line-chart-line" },
    {
      id: "products",
      label: "Products & Campaigns",
      icon: "ri-shopping-bag-line",
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: "ri-bar-chart-box-line",
    },
    {
      id: "payouts",
      label: "Payouts & Affiliates",
      icon: "ri-money-dollar-circle-line",
    },
    { id: "content", label: "Content Hub", icon: "ri-image-line" },
    { id: "settings", label: "System Settings", icon: "ri-settings-3-line" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-20 lg:hidden'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className='h-16 flex items-center px-6 border-b border-gray-200'>
          <img
            src='/logo.png'
            alt='Logo'
            className='h-8 w-auto object-contain'
          />
        </div>

        {/* Navigation */}
        <nav className='flex-1 overflow-y-auto py-4 px-3'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (window.innerWidth < 1024) {
                  setIsOpen(false);
                }
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                text-sm font-medium transition-all whitespace-nowrap
                ${
                  activeSection === item.id
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i
                className={`${item.icon} text-lg w-5 h-5 flex items-center justify-center`}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className='p-4 border-t border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold'>
              JD
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold text-gray-900 truncate'>
                John Doe
              </p>
              <p className='text-xs text-gray-500 truncate'>Business Owner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
