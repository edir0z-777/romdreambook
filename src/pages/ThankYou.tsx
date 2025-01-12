import React, { useEffect } from 'react';
import { Clock, Mail, Package, CheckCircle2, Palette, ArrowRight, Download, Gift } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Only allow access if coming from payment (has payment_id)
    const paymentId = searchParams.get('payment_id');
    if (!paymentId) {
      navigate('/', { replace: true });
    }
  }, [navigate, searchParams]);

  // If no payment ID, don't render anything while redirecting
  if (!searchParams.get('payment_id')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 md:py-20" dir="rtl">
      {/* Rest of the component remains exactly the same */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-purple-400/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
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

          {/* Next Steps Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">השלבים הבאים</h2>
            </div>

            <div className="space-y-8">
              {/* Timeline */}
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
              <Gift className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">קבצים להורדה</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-white rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">חוברת פעילויות</h3>
                  <p className="text-lg text-purple-700 mb-4">פעילויות מעשירות בעקבות הספר</p>
                  <a
                    href="/downloads/workbook.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-900 px-6 py-3 rounded-xl text-lg font-bold transition-all group-hover:gap-3"
                  >
                    <Download className="w-5 h-5" />
                    <span>להורדה</span>
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-white rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">חוברת צביעה</h3>
                  <p className="text-lg text-purple-700 mb-4">דפי צביעה מתוך הספר</p>
                  <a
                    href="/downloads/activity-book.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-900 px-6 py-3 rounded-xl text-lg font-bold transition-all group-hover:gap-3"
                  >
                    <Download className="w-5 h-5" />
                    <span>להורדה</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors"
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