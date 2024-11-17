import React from 'react';
import { BarChart2, Download } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscriptionStore';

export const Reports = () => {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);

  const categoryTotals = subscriptions.reduce((acc, sub) => {
    const monthlyAmount = sub.frequency === 'monthly' 
      ? sub.amount 
      : sub.frequency === 'yearly' 
        ? sub.amount / 12 
        : sub.amount * 4.33;
    
    acc[sub.category] = (acc[sub.category] || 0) + monthlyAmount;
    return acc;
  }, {} as Record<string, number>);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleExport = () => {
    const data = subscriptions.map(sub => ({
      nom: sub.name,
      montant: sub.amount,
      fréquence: sub.frequency,
      catégorie: sub.category,
      prochainPaiement: new Date(sub.nextPayment).toLocaleDateString('fr-FR')
    }));

    const csv = [
      ['Nom', 'Montant', 'Fréquence', 'Catégorie', 'Prochain Paiement'],
      ...data.map(row => Object.values(row))
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'abonnements.csv';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart2 className="w-6 h-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Dépenses par catégorie
            </h2>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div key={category} className="relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatCurrency(total)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-primary-500 h-2.5 rounded-full"
                  style={{
                    width: `${(total / Math.max(...Object.values(categoryTotals))) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};