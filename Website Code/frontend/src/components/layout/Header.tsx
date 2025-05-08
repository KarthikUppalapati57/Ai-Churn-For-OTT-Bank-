import React from 'react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen, title }) => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-neutral-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 p-1"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
              <span className="sr-only">
                {sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              </span>
            </button>
            <div className="ml-4 flex items-center">
              <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <button
                type="button"
                className="p-1 text-neutral-500 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white"></span>
            </div>
            
            <div className="ml-4 relative flex-shrink-0">
              <div>
                <button
                  type="button"
                  className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="font-medium text-primary-800">U</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;