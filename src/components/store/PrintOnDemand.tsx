import React from 'react';
import { Printer, Clock } from 'lucide-react';

const features = [
  'הדפסה באיכות גבוהה',
  'הקדשה אישית',
  'משלוח ישירות לבית הלקוח',
  'זמן אספקה: 7-10 ימי עסקים'
];

export function PrintOnDemand() {
  return (
    <div className="h-full bg-gray-50 rounded-2xl shadow-lg flex flex-col p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto mb-4">
          <Printer className="w-full h-full text-gray-400" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
          הדפסה לפי דרישה
        </h3>
        <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-medium text-gray-600">בקרוב</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="text-lg text-gray-500">
            • {feature}
          </div>
        ))}
      </div>

      <button
        disabled
        className="mt-auto h-[50px] rounded-xl text-lg font-bold bg-gray-300 text-white cursor-not-allowed"
      >
        בקרוב
      </button>
    </div>
  );
}