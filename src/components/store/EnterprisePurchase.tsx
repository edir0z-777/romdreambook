import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
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
          <Feature text="חוברת יצירה דיגיטלית במתנה" />
          <Feature text="חוברת פעילויות דיגיטלית בעקבות הספר" />
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
        <EnterpriseForm onClose={() => setShowForm(false)} />
      )}
    </>
  );
}