import React, { useEffect, useState } from 'react';
import { Clock, Mail, Package, CheckCircle2, BookOpen, Palette, ArrowRight, Printer } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Transaction {
  id: string;
  meta: {
    status: string;
  };
}

export function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateAndFetchTransaction = async () => {
      try {
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
          const response = await fetch(`/api/transaction?id=${paymentId}`);
          const data = await response.json();

          if (data.success) {
            setTransactionDetails(data.transaction);
          } else {
            setError('לא ניתן למצוא את פרטי העסקה');
          }
        }
      } catch (err) {
        setError('אירעה שגיאה בטעינת פרטי העסקה');
        console.error('Error fetching transaction:', err);
      } finally {
        setIsLoading(false);
      }
    };

    validateAndFetchTransaction();
  }, [navigate, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-purple-900">טוען את פרטי העסקה...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">{error}</h2>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>חזרה לדף הבית</span>
          </button>
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

          {/* Order Status Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">סטטוס ההזמנה</h2>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg text-purple-700">סטטוס:</span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-lg font-bold text-green-600">
                  {transactionDetails?.meta.status || 'אושרה'}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">השלבים הבאים</h2>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <div className="absolute top-0 bottom-0 right-[17px] w-0.5 bg-purple-100" />
                
                <div className="relative space-y-8">
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-600 shrink-0 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">אישור במייל</h3>
                      <p className="text-lg text-purple-700">אישור רכישה ופרטי ההזמנה נשלחו לכתובת המייל שלך</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-200 shrink-0 flex items-center justify-center">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">הכנת המשלוח</h3>
                      <p className="text-lg text-purple-700">המשלוח יצא תוך 1-3 ימי עסקים</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-200 shrink-0 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">זמן אספקה</h3>
                      <p className="text-lg text-purple-700">זמן אספקה משוער: 3-5 ימי עסקים</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Content Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-purple-900">התוספות הדיגיטליות שלך</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">חוברת פעילויות</h3>
                <p className="text-lg text-purple-700 mb-6">פעילויות מעשירות ומהנות בעקבות הספר, מותאמות במיוחד לילדים</p>
                <a
                  href="/downloads/workbook.pdf"
                  download
                  className="inline-flex items-center gap-3 text-purple-600 hover:text-purple-700 font-bold text-lg group"
                >
                  <span className="border-b-2 border-purple-200 group-hover:border-purple-500 transition-colors">להורדת החוברת</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">חוברת צביעה</h3>
                <p className="text-lg text-purple-700 mb-6">דפי צביעה מקסימים מתוך הספר לפעילות יצירתית ומהנה</p>
                <a
                  href="/downloads/activity-book.pdf"
                  download
                  className="inline-flex items-center gap-3 text-purple-600 hover:text-purple-700 font-bold text-lg group"
                >
                  <span className="border-b-2 border-purple-200 group-hover:border-purple-500 transition-colors">להורדת החוברת</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-purple-100 text-purple-900 py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-200 transition-colors"
            >
              <Printer className="w-5 h-5" />
              <span>הדפסת אישור</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span>חזרה לדף הבית</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}