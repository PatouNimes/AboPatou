import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { CalendarDays } from 'lucide-react';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { subscriptions } = useSubscriptionStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getSubscriptionsForDay = (date: Date) => {
    return subscriptions.filter(sub => {
      const nextPayment = new Date(sub.nextPayment);
      return nextPayment.getDate() === date.getDate() &&
             nextPayment.getMonth() === date.getMonth() &&
             nextPayment.getFullYear() === date.getFullYear();
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary-500" />
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700"
              aria-label="Mois précédent"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700"
              aria-label="Mois suivant"
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
          <div
            key={day}
            className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {days.map((day) => {
          const daySubscriptions = getSubscriptionsForDay(day);
          
          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] bg-white dark:bg-gray-800 p-2 ${
                !isSameMonth(day, currentDate) ? 'bg-gray-50 dark:bg-gray-900' : ''
              }`}
            >
              <p
                className={`text-sm ${
                  isToday(day)
                    ? 'bg-primary-500 text-white w-6 h-6 rounded-full flex items-center justify-center'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {format(day, 'd')}
              </p>
              <div className="mt-2 space-y-1">
                {daySubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="px-2 py-1 text-xs rounded-md bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  >
                    {sub.name} - {formatCurrency(sub.amount)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};