import React, { useEffect, useState } from 'react';
import { Clock, Mail, Package, CheckCircle2, Printer, BookOpen, Palette, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  
  useEffect(() => {
    // Get referrer and payment ID
    const referrer = document.referrer;
    const paymentId = searchParams.get('payment_id');
    const isFromPayment = referrer.startsWith('https://pay.grow.link/');
    
    // If not from payment site and no payment ID, redirect to home
    if (!isFromPayment && !paymentId) {
      navigate('/', { replace: true });
      return;
    }

    // If we have a payment ID, fetch the transaction details
    if (paymentId) {
      fetch(`/api/transaction?id=${paymentId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTransactionDetails(data.transaction);
          }
        })
        .catch(console.error);
    }
  }, [navigate, searchParams]);

  // Get payment ID from URL params
  const paymentId = searchParams.get('payment_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 md:py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              תודה על הרכישה!
            </h1>
            <p className="text-xl md:text-2xl text-purple-700">
              ההזמנה שלך התקבלה בהצלחה
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">פרטי ההזמנה</h2>
            </div>
            
            <div className="grid gap-6">
              <div className="flex justify-between items-center pb-4 border-b border-purple-100">
                <span className="text-lg text-purple-700">מספר הזמנה:</span>
                <span className="text-lg font-bold text-purple-900 font-mono">
                  {paymentId || 'לא זמין'}
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-purple-100">
                <span className="text-lg text-purple-700">סטטוס:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-lg font-bold text-green-600">אושרה</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg text-purple-700">סכום:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-purple-900">
                    ₪{transactionDetails?.amount || searchParams.get('payment_sum') || '0'}
                  </span>
                  <div className="text-sm text-purple-600">כולל מע״מ ומשלוח</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the component remains the same */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}