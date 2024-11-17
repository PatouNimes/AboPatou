import React from 'react';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { DollarSign, TrendingUp, Calendar, Clock } from 'lucide-react';

export const Stats = () => {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);

  const totalMonthly = subscriptions.reduce((acc, sub) => {
    if (sub.frequency === 'monthly') return acc + sub.amount;
    if (sub.frequency === 'yearly') return acc + (sub.amount / 12);
    if (sub.frequency === 'weekly') return acc + (sub.amount * 4.33);
    return acc;
  }, 0);

  const totalYearly = totalMonthly * 12;
  const activeSubscriptions = subscriptions.length;
  const nextPayment = subscriptions.length > 0
    ? new Date(Math.min(...subscriptions.map(sub => new Date(sub.nextPayment).getTime())))
    : null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
            <DollarSign className="w-6 h-6 text-primary-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Dépenses mensuelles</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {formatCurrency(totalMonthly)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
            <TrendingUp className="w-6 h-6 text-primary-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Dépenses annuelles</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {formatCurrency(totalYearly)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
            <Calendar className="w-6 h-6 text-primary-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Abonnements actifs</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {activeSubscriptions}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
            <Clock className="w-6 h-6 text-primary-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prochain paiement</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {nextPayment ? formatDate(nextPayment) : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};