import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Versions } from './pages/Versions';
import { TotemGenerator } from './pages/TotemGenerator';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'versions':
        return <Versions />;
      case 'totems':
        return <TotemGenerator />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500 font-mono">
            Module [{activeTab}] under initialization...
          </div>
        );
    }
  };

  return <Layout activeTab={activeTab} setActiveTab={setActiveTab}>{renderContent()}</Layout>;
};

export default App;
