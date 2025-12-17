import { useState } from "react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "alert",
      message: "Suspicious activity detected from IP 192.168.1.1",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "info",
      message: "New affiliate registration pending approval",
      time: "15 min ago",
    },
    {
      id: 3,
      type: "success",
      message: "Payout batch #1234 completed successfully",
      time: "1 hour ago",
    },
  ];

  return (
    <header className='bg-white border-b border-gray-200 px-4 py-4 lg:px-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer'
          >
            <i className='ri-menu-line text-xl text-gray-700' />
          </button>

          {/* Search Bar */}
          <div className='relative flex-1 max-w-md'>
            <i className='ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' />
            <input
              type='text'
              placeholder='Search users, campaigns, transactions...'
              className='w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {/* Notifications Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className='relative p-2 rounded-lg hover:bg-gray-100 cursor-pointer'
            >
              <i className='ri-notification-3-line text-xl text-gray-700' />
              {/* Notification Badge */}
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
                <div className='px-4 py-3 border-b border-gray-200'>
                  <h3 className='text-sm font-semibold text-gray-900'>
                    Notifications
                  </h3>
                </div>
                <div className='max-h-96 overflow-y-auto'>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className='px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer'
                    >
                      <p className='text-sm text-gray-900'>{notif.message}</p>
                      <p className='text-xs text-gray-500 mt-1'>{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className='px-4 py-3 text-center'>
                  <button className='text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap cursor-pointer'>
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Button */}
          <button className='hidden md:flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer'>
            <i className='ri-add-line text-lg' />
            Quick Action
          </button>
        </div>
      </div>
    </header>
  );
}
