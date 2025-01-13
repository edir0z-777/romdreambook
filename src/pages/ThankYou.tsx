import React from 'react';
import { Clock, Mail, Package, CheckCircle2, BookOpen, Palette, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ThankYou() {
  const navigate = useNavigate();

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
                <span className="text-lg text-purple-700">סטטוס:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-lg font-bold text-green-600">אושרה</span>
                </div>
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

          {/* Back to Home Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-8 rounded-xl text-xl font-bold hover:bg-purple-700 transition-all hover:scale-105 transform"
            >
              <ArrowRight className="w-6 h-6" />
              <span>חזרה לדף הבית</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}