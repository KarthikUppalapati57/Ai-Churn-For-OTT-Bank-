import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import { ChurnProvider } from './context/ChurnContext';

// Page types
type PageType = 'dashboard' | 'predictions' | 'customers' | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'predictions':
        return <Predictions />;
      case 'customers':
        return <Customers />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ChurnProvider>
      <div className="flex h-screen bg-neutral-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          setCurrentPage={setCurrentPage} 
          currentPage={currentPage} 
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header 
            toggleSidebar={toggleSidebar} 
            sidebarOpen={sidebarOpen}
            title={currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} 
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </ChurnProvider>
  );
};

export default App;