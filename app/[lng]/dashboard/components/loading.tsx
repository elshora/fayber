import React from "react";

export default function loading() {
  return (
    <div className="p-4 space-y-4  bg-gray-100">
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between p-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex justify-between p-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};