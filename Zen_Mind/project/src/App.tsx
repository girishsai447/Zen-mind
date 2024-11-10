import React, { useState } from 'react';
import { Users, Brain, LifeBuoy, Menu, HomeIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import SupportGroups from './components/SupportGroups';
import EmotionalProfiling from './components/EmotionalProfiling';
import GetHelp from './components/GetHelp';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'support-groups', label: 'Support Groups', icon: Users },
    { id: 'emotional-profiling', label: 'Emotional Profiling', icon: Brain },
    { id: 'get-help', label: 'Get Help', icon: LifeBuoy },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />;
      case 'support-groups':
        return <SupportGroups />;
      case 'emotional-profiling':
        return <EmotionalProfiling />;
      case 'get-help':
        return <GetHelp />;
      default:
        return <HomePage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden bg-white p-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-purple-600">Zen-Mind</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-gray-800"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex">
        <main className="flex-1 p-6 lg:p-8">
          {renderPage()}
          {!isNavVisible && (
            <button
              onClick={() => setIsNavVisible(true)}
              className="fixed top-4 right-4 bg-white p-2 rounded-lg shadow-lg text-gray-600 hover:text-gray-800"
            >
              <Menu size={24} />
            </button>
          )}
        </main>

        {isNavVisible && (
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            menuItems={menuItems}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            onClose={() => setIsNavVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;