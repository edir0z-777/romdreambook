import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface EnterpriseFormProps {
  onClose: () => void;
}

export function EnterpriseForm({ onClose }: EnterpriseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setTimeout(onClose, 2000);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-green-600 mb-2">תודה רבה!</h3>
        <p className="text-gray-600">פנייתך התקבלה בהצלחה. ניצור איתך קשר בהקדם.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-bold text-purple-900 mb-6">פרטי המוסד</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          שם המוסד
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          איש קשר
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          טלפון
        </label>
        <input
          type="tel"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          דוא״ל
        </label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          כמות משוערת
        </label>
        <input
          type="number"
          min="1"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          הערות נוספות
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>שולח...</span>
          </>
        ) : (
          <span>שליחה</span>
        )}
      </button>
    </form>
  );
}