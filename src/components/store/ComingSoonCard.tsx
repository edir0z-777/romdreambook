import React from 'react';
import { Printer } from 'lucide-react';

export function ComingSoonCard() {
  return (
    <div className="relative p-6 rounded-2xl border-2 border-gray-200 bg-gray-50">
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto mb-4">
          <Printer className="w-full h-full text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">
          הדפסה לפי דרישה
        </h3>
        <div className="text-gray-500">
          בקרוב...
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="text-gray-500">
          אפשרות להדפסה מותאמת אישית
        </div>
      </div>

      <button
        disabled
        className="w-full flex items-center justify-center gap-2 bg-gray-300 text-white py-3 px-6 rounded-xl text-lg font-bold cursor-not-allowed"
      >
        <span>בקרוב</span>
      </button>
    </div>
  );
}