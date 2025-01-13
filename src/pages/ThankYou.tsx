import React, { useEffect, useState } from 'react';
import { Clock, Mail, Package, CheckCircle2, Printer, BookOpen, Palette, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface TransactionDetails {
  id: string;
  amount: number;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  payment: {
    type: string;
    card: {
      brand: string;
      suffix: string;
      type: string;
    };
  };
}

export function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const transactionId = searchParams.get('transaction_id');
    const referrer = document.referrer;
    const isFromPayment = referrer.startsWith('https://pay.grow.link/');
    
    // If not from payment site and no transaction ID, redirect to home
    if (!isFromPayment && !transactionId) {
      navigate('/', { replace: true });
      return;
    }

    // Fetch transaction details
    if (transactionId) {
      fetch(`/api/transaction?id=${transactionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.transaction) {
            setTransaction(data.transaction);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate, searchParams]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-900">טוען פרטי עסקה...</h2>
        </div>
      </div>
    );
  }

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
                  {transaction?.id || 'לא זמין'}
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
                    ₪{transaction?.amount || '0'}
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