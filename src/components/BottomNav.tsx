import React from 'react';
import { Calendar, CreditCard, Bell, BarChart2 } from 'lucide-react';

type Tab = 'calendar' | 'subscriptions' | 'notifications' | 'reports';

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: Props) => {
  const tabs = [
    { id: 'calendar' as Tab, icon: Calendar, label: 'Calendrier' },
    { id: 'subscriptions' as Tab, icon: CreditCard, label: 'Abonnements' },
    { id: 'notifications' as Tab, icon: Bell, label: 'Notifications' },
    { id: 'reports' as Tab, icon: BarChart2, label: 'Rapports' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-4">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center py-2 ${
              activeTab === id
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};