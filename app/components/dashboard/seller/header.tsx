"use client";
import { useSeller } from "../../../hooks/useSeller";
interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
  const { data: seller, isLoading, error } = useSeller();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <header
      className='
        fixed top-0 left-0 right-0
        h-16 bg-white border-b border-gray-200 z-40 
        flex items-center justify-between px-4 lg:px-8
        shadow-sm
      '
    >
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden text-gray-700 text-2xl'
      >
        <i className='ri-menu-line'></i>
      </button>

      {/* Brand Title */}
      <h1 className='text-xl font-semibold text-gray-800 hidden lg:block'>
        Seller Dashboard
      </h1>

      {/* User Section */}
      <div className='flex items-center gap-4'>
        <i className='ri-notification-3-line text-xl text-gray-600 cursor-pointer hover:text-gray-800'></i>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm'>
            JD
          </div>
          <span className='text-sm font-medium text-gray-700 hidden sm:block'>
            {seller?.fullName}
          </span>
        </div>
      </div>
    </header>
  );
}
