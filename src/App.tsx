import React from 'react';
import { Calendar } from './components/Calendar';
import { AddSubscription } from './components/AddSubscription';
import { Stats } from './components/Stats';
import { BottomNav } from './components/BottomNav';
import { NotificationPreferences } from './components/NotificationPreferences';
import { Reports } from './components/Reports';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'calendar' | 'subscriptions' | 'notifications' | 'reports'>('calendar');

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <>
            <Stats />
            <Calendar />
          </>
        );
      case 'notifications':
        return <NotificationPreferences />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <>
            <Stats />
            <Calendar />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 pb-16 md:pb-0">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-500">AbonnementPro</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <AddSubscription />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;