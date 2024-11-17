import React from 'react';
import { Bell } from 'lucide-react';

export const NotificationPreferences = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Bell className="w-6 h-6 text-primary-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Préférences de notification
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">
            Notification 7 jours avant
          </label>
          <input
            type="checkbox"
            className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">
            Notification 1 jour avant
          </label>
          <input
            type="checkbox"
            className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">
            Notification le jour même
          </label>
          <input
            type="checkbox"
            className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">
            Notifications par email
          </label>
          <input
            type="checkbox"
            className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
};