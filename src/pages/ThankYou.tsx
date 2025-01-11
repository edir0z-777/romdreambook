import React from 'react';
import { Clock, Mail, Package, CheckCircle2, Printer, Share2, BookOpen, Palette } from 'lucide-react';
import { useSearchParams, Navigate } from 'react-router-dom';

export function ThankYou() {
  const [searchParams] = useSearchParams();
  
  // Get parameters from Meshulam's response
  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');
  const quantity = searchParams.get('quantity');
  const status = searchParams.get('status');

  // Redirect to home if accessed directly without parameters
  if (!orderId || !status) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 md:py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Message with Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-purple-600 animate-[ping_1s_ease-in-out_1]" />
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-2">
              תודה על הזמנתך!
            </h1>
            <p className="text-xl text-purple-700">
              אישור הזמנה נשלח לכתובת המייל שלך
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 backdrop-blur-sm bg-white/80">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">פרטי ההזמנה</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-purple-100">
                <span className="text-lg text-purple-700">מס׳ הזמנה:</span>
                <span className="text-lg font-bold text-purple-900">#{orderId}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-purple-100">
                <span className="text-lg text-purple-700">סטטוס:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-lg font-bold text-green-600">התקבלה</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-purple-100">
                <span className="text-lg text-purple-700">כמות:</span>
                <span className="text-lg font-bold text-purple-900">{quantity} ספרים</span>
              </div>
              <div className="flex justify-between items-center pb-4">
                <span className="text-lg text-purple-700">סכום:</span>
                <div className="text-left">
                  <span className="text-xl font-bold text-purple-900">₪{amount}</span>
                  <div className="text-sm text-purple-600">כולל מע״מ ומשלוח</div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4 border-t border-purple-100">
                <button
                  onClick={() => window.print()}
                  className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                >
                  <Printer className="w-5 h-5" />
                  <span className="text-lg font-bold">להדפסה</span>
                </button>
                <button
                  onClick={() => navigator.share({
                    title: `הזמנה מספר #${orderId}`,
                    text: 'הזמנתי את הספר "עולם החלומות של רומי"'
                  })}
                  className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-lg font-bold">שיתוף</span>
                </button>
              </div>
            </div>
          </div>

          {/* Activity Book Download Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">פעילויות בעקבות הספר</h2>
            </div>
            <div className="text-lg text-purple-700 mb-4">
              חוברות עם פעילויות יצירה והעשרה לחוויה משותפת של הורים וילדים
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/downloads/workbook.pdf"
                download
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-lg font-bold">הורדת חוברת פעילויות</span>
              </a>
              <a
                href="/downloads/activity-book.pdf"
                download
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
              >
                <Palette className="w-5 h-5" />
                <span className="text-lg font-bold">הורדת חוברת יצירה</span>
              </a>
            </div>
          </div>

          {/* What's Next Card */}
          <div className="bg-gradient-to-br from-purple-50/80 to-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">מה הלאה?</h2>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute top-0 bottom-0 right-3 w-[2px] bg-purple-100" />
                <div className="relative flex gap-6">
                  <div className="w-6 h-6 rounded-full bg-purple-600 shrink-0 mt-1" />
                  <div className="pb-6">
                    <p className="text-lg text-purple-900 font-bold mb-2">ההזמנה בטיפול</p>
                    <p className="text-lg text-purple-700">אנו מתחילים להכין את ההזמנה שלך</p>
                  </div>
                </div>
                <div className="relative flex gap-6">
                  <div className="w-6 h-6 rounded-full bg-purple-200 shrink-0 mt-1" />
                  <div className="pb-6">
                    <p className="text-lg text-purple-800 font-bold mb-2">זמן אספקה משוער: 3-5 ימי עסקים</p>
                    <p className="text-lg text-purple-700">אנו נעדכן אותך במייל כאשר ההזמנה תצא למשלוח</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">לשאלות ובירורים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://wa.me/message/LWSLVC2LQDFRN1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 transition-all px-4 py-3 rounded-xl border border-purple-100 hover:border-purple-200"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <img 
                    src="/images/whatsapp-white.png" 
                    alt="WhatsApp"
                    className="w-5 h-5 invert opacity-60"
                  />
                </div>
                <div className="text-lg font-bold text-purple-900">דברו איתנו בוואטסאפ</div>
              </a>
              <a
                href="mailto:anatrozenstein@gmail.com"
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 transition-all px-4 py-3 rounded-xl border border-purple-100 hover:border-purple-200"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-lg font-bold text-purple-900">שליחת מייל</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}