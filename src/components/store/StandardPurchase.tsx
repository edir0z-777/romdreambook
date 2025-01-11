import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Feature } from './Feature';
import { PaymentPopup } from './PaymentPopup';

const bundles = [
  {
    id: 'single',
    quantity: 1,
    price: 69,
    description: 'ספר אחד',
    paymentLink: 'https://pay.grow.link/60567760653c25001044711e6bcd57fe-MTYyMDU2NA?success_return_url=' + encodeURIComponent(window.location.origin + '/thank-you')
  },
  {
    id: 'double',
    quantity: 2,
    price: 124,
    pricePerUnit: 62,
    discount: 10,
    description: 'שני ספרים',
    paymentLink: 'https://pay.grow.link/4b9c04456a9a7b7e2a7bd474fbdaf3f3-MTYyMDc1OQ?success_return_url=' + encodeURIComponent(window.location.origin + '/thank-you')
  },
  {
    id: 'triple',
    quantity: 3,
    price: 175,
    pricePerUnit: 58,
    discount: 15,
    description: 'שלושה ספרים',
    paymentLink: 'https://pay.grow.link/d82445cd2b91b15349d1a18e060ac8af-MTYyMDc4MA?success_return_url=' + encodeURIComponent(window.location.origin + '/thank-you')
  }
];

export function StandardPurchase() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handlePurchase = () => {
    if (!selectedBundle) return;
    setShowPaymentPopup(true);
  };

  const selectedBundleData = selectedBundle ? bundles.find(b => b.id === selectedBundle) : null;

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg flex flex-col">
      <div className="p-4 md:p-6 flex flex-col gap-3">
        <h3 className="text-lg md:text-2xl font-bold text-purple-900 text-center">
          רכישה רגילה
        </h3>

        <div className="flex flex-col gap-2">
          {bundles.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => setSelectedBundle(bundle.id)}
              className={`w-full p-3 rounded-xl border-2 transition-all text-right ${
                selectedBundle === bundle.id 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-purple-100 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base md:text-xl font-bold text-purple-900">
                    {bundle.description}
                  </div>
                  {bundle.pricePerUnit && (
                    <div className="text-sm md:text-lg text-purple-700">
                      ₪{bundle.pricePerUnit} / יח׳ (כולל מע״מ)
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="text-lg md:text-2xl font-bold text-purple-600">₪{bundle.price}</div>
                  <div className="text-sm md:text-base text-purple-700">כולל מע״מ</div>
                  {bundle.discount && (
                    <div className="text-sm md:text-lg text-green-600 font-medium">
                      {bundle.discount}% הנחה
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 mb-2">
          <Feature text="כריכה קשה יוקרתית" />
          <Feature text="חוברת יצירה דיגיטלית במתנה" />
          <Feature text="חוברת פעילויות דיגיטלית בעקבות הספר" />
          <Feature text="הקדשה אישית" />
          <Feature text="משלוח חינם" />
        </div>

        <div className="sticky bottom-4 md:relative md:bottom-0 z-10 mt-auto">
          <button
            onClick={handlePurchase}
            disabled={!selectedBundle}
            className="w-full h-[50px] flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-lg md:shadow-none"
          >
            <span>לרכישה מאובטחת</span>
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showPaymentPopup && selectedBundleData && (
        <PaymentPopup
          bundle={{
            quantity: selectedBundleData.quantity,
            price: selectedBundleData.price
          }}
          paymentLink={selectedBundleData.paymentLink}
          onClose={() => setShowPaymentPopup(false)}
        />
      )}
    </div>
  );
}