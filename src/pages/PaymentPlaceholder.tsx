import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export function PaymentPlaceholder() {
  const { bundle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading and redirect after 2 seconds
    const timer = setTimeout(() => {
      // This will be replaced with actual Meshulam payment URLs
      navigate('/store');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getBundleDetails = () => {
    switch (bundle) {
      case 'single':
        return { quantity: 1, price: 59 };
      case 'double':
        return { quantity: 2, price: 106 };
      case 'triple':
        return { quantity: 3, price: 150 };
      default:
        return { quantity: 0, price: 0 };
    }
  };

  const { quantity, price } = getBundleDetails();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="animate-spin mb-6">
          <Loader2 className="w-12 h-12 text-purple-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          מעבר לדף התשלום
        </h2>
        <div className="text-lg text-purple-700 mb-6">
          {quantity} ספרים - ₪{price}
        </div>
        <p className="text-purple-600">
          אנא המתן, מעביר אותך לדף התשלום המאובטח...
        </p>
      </div>
    </div>
  );
}