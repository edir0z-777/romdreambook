import React, { useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export function StandardPurchase() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (!selectedBundle) return;
    setIsProcessing(true);
    // Navigate to placeholder payment page
    navigate(`/payment/${selectedBundle}`);
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg flex flex-col">
      <div className="p-4 md:p-6 space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-purple-900 text-center mb-2">
          רכישה רגילה
        </h3>

        <div className="space-y-2">
          {bundles.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => setSelectedBundle(bundle.id)}
              className={`w-full p-3 md:p-4 rounded-xl border-2 transition-all text-right ${
                selectedBundle === bundle.id 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-purple-100 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg md:text-xl font-bold text-purple-900">
                    {bundle.description}
                  </div>
                  {bundle.pricePerUnit && (
                    <div className="text-sm md:text-base text-purple-700">
                      ₪{bundle.pricePerUnit} / יח׳
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold text-purple-600">₪{bundle.price}</div>
                  {bundle.discount && (
                    <div className="text-sm md:text-base text-green-600 font-medium">
                      {bundle.discount}% הנחה
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-2 md:space-y-2">
          <Feature text="כריכה קשה יוקרתית" />
          <Feature text="חוברת צביעה דיגיטלית במתנה" />
          <Feature text="חוברת פעילויות במתנה" />
          <Feature text="הקדשה אישית" />
          <Feature text="משלוח חינם" />
        </div>

        <button
          onClick={handlePurchase}
          disabled={!selectedBundle || isProcessing}
          className="w-full h-[50px] flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl text-lg md:text-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>מעבד...</span>
            </>
          ) : (
            <>
              <span>לרכישה מאובטחת</span>
              <ShoppingCart className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}