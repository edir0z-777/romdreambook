import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface PaymentPopupProps {
  bundle: {
    quantity: number;
    price: number;
  };
  paymentLink: string;
  onClose: () => void;
}

export function PaymentPopup({ bundle, paymentLink, onClose }: PaymentPopupProps) {
  useEffect(() => {
    // Extract transaction ID from payment link
    const transactionId = paymentLink.split('-').pop()?.split('?')[0];
    
    // Construct the return URL with transaction ID
    const returnUrl = new URL('/thank-you', window.location.origin);
    returnUrl.searchParams.set('transaction_id', transactionId || '');
    
    // Add return URL to payment link
    const finalPaymentUrl = new URL(paymentLink);
    finalPaymentUrl.searchParams.set('success_url', returnUrl.toString());
    
    // Redirect to payment page after a short delay
    const timer = setTimeout(() => {
      window.location.href = finalPaymentUrl.toString();
    }, 1500);

    return () => clearTimeout(timer);
  }, [paymentLink]);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full text-center">
        <Loader2 className="w-12 h-12 text-purple-600 mx-auto animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          מעבר לדף התשלום
        </h2>
        <div className="text-lg text-purple-700 mb-6">
          {bundle.quantity} ספרים - ₪{bundle.price}
        </div>
        <p className="text-purple-600">
          אנא המתן, מעביר אותך לדף התשלום המאובטח...
        </p>
      </div>
    </div>,
    document.body
  );
}