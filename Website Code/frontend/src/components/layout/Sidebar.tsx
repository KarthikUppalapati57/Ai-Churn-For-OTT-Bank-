import React from 'react';
import { 
  ChartPieIcon, 
  PresentationChartLineIcon, 
  UsersIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  setCurrentPage: (page: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, setCurrentPage }) => {
  const navItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: ChartPieIcon 
    },
    { 
      id: 'predictions', 
      name: 'Predictions', 
      icon: PresentationChartLineIcon 
    },
    { 
      id: 'customers', 
      name: 'Customers', 
      icon: UsersIcon 
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Cog6ToothIcon 
    },
  ];

  return (
    <div 
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out flex flex-col h-screen fixed lg:relative z-30`}
    >
      <div className="flex items-center justify-center h-16 border-b border-neutral-200">
        <div className={`flex items-center ${isOpen ? 'justify-start pl-4' : 'justify-center'}`}>
          <div className="flex-shrink-0 flex items-center">
            <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold">CP</span>
            </div>
            {isOpen && (
              <span className="ml-2 text-lg font-semibold text-neutral-900">
                ChurnPulse
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`${
                currentPage === item.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-neutral-600 hover:bg-neutral-100'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out w-full`}
            >
              <item.icon
                className={`${
                  currentPage === item.id ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-500'
                } mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-150 ease-in-out`}
                aria-hidden="true"
              />
              {isOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-neutral-200">
        <div className={`flex ${isOpen ? 'items-start' : 'justify-center'} text-sm text-neutral-500`}>
          {isOpen ? (
            <div>
              <p className="font-medium text-neutral-600">ChurnPulse Analytics</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          ) : (
            <span className="text-xs">v1.0</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;