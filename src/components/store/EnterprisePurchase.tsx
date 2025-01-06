import React, { useState } from 'react';
import { Building2, X } from 'lucide-react';
import { EnterpriseForm } from './EnterpriseForm';
import { Feature } from './Feature';

export function EnterprisePurchase() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="h-full bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg flex flex-col p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-4">
            <Building2 className="w-full h-full text-purple-600" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">
            רכישה מרוכזת
          </h3>
          <p className="text-lg text-purple-700">
            לגנים, בתי ספר ומוסדות חינוך
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <Feature text="מחיר מיוחד לרכישה מרוכזת" />
          <Feature text="חוברת צביעה דיגיטלית במתנה" />
          <Feature text="חוברת פעילויות במתנה" />
          <Feature text="הקדשה אישית" />
          <Feature text="משלוח מרוכז" />
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-auto h-[50px] rounded-xl text-lg font-bold bg-purple-100 text-purple-900 hover:bg-purple-200 transition-colors"
        >
          ליצירת קשר
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <EnterpriseForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}