import React, { useState } from 'react';
import { Check, ShoppingCart, Loader2 } from 'lucide-react';
import { usePayment } from './usePayment';
import { Feature } from './Feature';

const bundles = [
  {
    id: 'single',
    quantity: 1,
    price: 59,
    description: 'ספר אחד'
  },
  {
    id: 'double',
    quantity: 2,
    price: 106,
    pricePerUnit: 53,
    discount: 10,
    description: 'שני ספרים'
  },
  {
    id: 'triple',
    quantity: 3,
    price: 150,
    pricePerUnit: 50,
    discount: 15,
    description: 'שלושה ספרים'
  }
];

export function BundleOptions() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const { processPayment, isProcessing, error } = usePayment();

  const handlePurchase = () => {
    if (!selectedBundle) return;
    const bundle = bundles.find(b => b.id === selectedBundle);
    if (!bundle) return;

    processPayment({
      variant: {
        id: 'hardcover',
        price: bundle.price,
        quantity: bundle.quantity
      }
    });
  };

  return (
    <div className="space-y-4">
      {bundles.map((bundle) => (
        <button
          key={bundle.id}
          onClick={() => setSelectedBundle(bundle.id)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-right ${
            selectedBundle === bundle.id 
              ? 'border-purple-600 bg-purple-50' 
              : 'border-purple-100 hover:border-purple-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-purple-900">
                {bundle.description}
              </div>
              {bundle.pricePerUnit && (
                <div className="text-lg text-purple-700">
                  ₪{bundle.pricePerUnit} / יח׳
                </div>
              )}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-purple-600">₪{bundle.price}</div>
              {bundle.discount && (
                <div className="text-lg text-green-600 font-medium">
                  {bundle.discount}% הנחה
                </div>
              )}
            </div>
          </div>
        </button>
      ))}

      <div className="space-y-4 mt-8">
        <Feature text="כריכה קשה יוקרתית" />
        <Feature text="חוברת צביעה דיגיטלית במתנה" />
        <Feature text="חוברת פעילויות במתנה" />
        <Feature text="משלוח חינם" />
      </div>

      <button
        onClick={handlePurchase}
        disabled={!selectedBundle || isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-6 rounded-xl text-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 mt-8"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>מעבד...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6" />
            <span>לרכישה</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-lg text-center">
          {error}
        </div>
      )}
    </div>
  );
}