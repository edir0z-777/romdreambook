import React, { useEffect } from 'react';
import { Clock, Mail, Package, CheckCircle2, BookOpen, Palette, ArrowRight, Download } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Allowed IPs for production
const ALLOWED_IPS = [
  '18.158.107.17', '3.121.149.170', '3.76.166.104', '3.69.160.29', '3.78.79.166',
  '3.71.221.153', '3.78.131.18', '3.67.110.47', '18.192.112.151', '52.59.95.229',
  '18.158.145.146', '3.75.128.58', '3.78.28.179', '3.122.21.187', '3.66.126.119',
  '35.158.249.118', '52.29.70.254', '52.59.159.234', '3.76.183.119', '18.157.106.67',
  '18.156.94.176', '18.197.238.68', '3.66.129.154', '3.77.123.153', '3.70.40.72'
];

export function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Skip validation in development/WebContainer
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Skipping IP validation');
      return;
    }

    // Get client IP (this should be set by your server/infrastructure)
    const clientIP = document.head.querySelector('meta[name="client-ip"]')?.getAttribute('content');
    
    if (!clientIP || !ALLOWED_IPS.includes(clientIP)) {
      console.log('Invalid access attempt:', { clientIP });
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const paymentStatus = searchParams.get('payment_status') || '1';

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
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">סטטוס הזמנה</h2>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-green-50 py-4 px-6 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xl font-bold text-green-600">
                {paymentStatus === '1' ? 'אושרה' : 'בתהליך'}
              </span>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-8 mb-12">
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
                      <p className="text-lg md:text-xl text-purple-700 leading-relaxed">
                        אישור רכישה ופרטי ההזמנה נשלחו לכתובת המייל שלך
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-200 shrink-0 flex items-center justify-center">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">הכנת המשלוח</h3>
                      <p className="text-lg md:text-xl text-purple-700 leading-relaxed">
                        המשלוח יצא תוך 1-3 ימי עסקים
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-200 shrink-0 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">זמן אספקה</h3>
                      <p className="text-lg md:text-xl text-purple-700 leading-relaxed">
                        זמן אספקה משוער: 3-5 ימי עסקים
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Content Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="w-10 h-10 text-purple-600" />
                <h2 className="text-3xl font-bold text-purple-900">התוספות הדיגיטליות שלך</h2>
              </div>
              <p className="text-xl text-purple-700">
                קבצים דיגיטליים להורדה מיידית
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/90 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <BookOpen className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">חוברת פעילויות</h3>
                  <p className="text-lg text-purple-700 leading-relaxed">
                    פעילויות מעשירות בעקבות הספר לחוויה משפחתית מהנה
                  </p>
                </div>
                <a
                  href="/downloads/workbook.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  <span>להורדת החוברת</span>
                </a>
              </div>

              <div className="bg-white/90 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Palette className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">חוברת צביעה</h3>
                  <p className="text-lg text-purple-700 leading-relaxed">
                    דפי צביעה מיוחדים מתוך הספר לפיתוח היצירתיות
                  </p>
                </div>
                <a
                  href="/downloads/activity-book.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  <span>להורדת החוברת</span>
                </a>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-10 rounded-xl text-lg font-bold hover:bg-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
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