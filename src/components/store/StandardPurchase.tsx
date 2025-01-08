import React, { useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Feature } from './Feature';

const bundles = [
  {
    id: 'single',
    quantity: 1,
    price: 69,
    description: 'ספר אחד',
    paymentLink: 'https://pay.grow.link/60567760653c25001044711e6bcd57fe-MTYyMDU2NA'
  },
  {
    id: 'double',
    quantity: 2,
    price: 124,
    pricePerUnit: 62,
    discount: 10,
    description: 'שני ספרים',
    paymentLink: 'https://pay.grow.link/4b9c04456a9a7b7e2a7bd474fbdaf3f3-MTYyMDc1OQ'
  },
  {
    id: 'triple',
    quantity: 3,
    price: 175,
    pricePerUnit: 58,
    discount: 15,
    description: 'שלושה ספרים',
    paymentLink: 'https://pay.grow.link/d82445cd2b91b15349d1a18e060ac8af-MTYyMDc4MA'
  }
];

export function StandardPurchase() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!selectedBundle) return;
    
    const bundle = bundles.find(b => b.id === selectedBundle);
    if (!bundle) return;

    setIsProcessing(true);
    
    try {
      // Show loading state for at least 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.open(bundle.paymentLink, '_blank', 'noopener,noreferrer');
    } finally {
      // Reset processing state after a short delay
      setTimeout(() => setIsProcessing(false), 500);
    }
  };

  if (isProcessing) {
    return (
      <div className="h-full bg-white rounded-2xl shadow-lg flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-purple-900 mb-2">מעבר לדף התשלום</h3>
          <p className="text-purple-700">אנא המתן...</p>
        </div>
      </div>
    );
  }

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
                      ₪{bundle.pricePerUnit} / יח׳ (כולל מע״מ)
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold text-purple-600">₪{bundle.price}</div>
                  <div className="text-sm text-purple-700">כולל מע״מ</div>
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
          disabled={!selectedBundle}
          className="w-full h-[50px] flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl text-lg md:text-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <span>לרכישה מאובטחת</span>
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}