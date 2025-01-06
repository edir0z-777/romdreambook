import React from 'react';
import { ScrollReveal } from '../../common/ScrollReveal';

export function StoryContent() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/30 rounded-3xl" />
      
      <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg p-8 md:p-12 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full mb-12" />
              
              <p className="text-2xl md:text-3xl text-purple-900 leading-relaxed font-light">
                כאמא טרייה, הבנתי את החשיבות של שיח משמעותי עם ילדים.
                ביליתי שנתיים מיוחדות עם רומי וחיפשתי דרכים להעשיר את עולמה
                באמצעות תוכן איכותי שיעודד דיאלוג, מחשבה ודמיון.
              </p>

              <p className="text-2xl md:text-3xl text-purple-900 leading-relaxed font-light mt-6">
                כך נולד ״עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי״ - ספר ייחודי המפתח שפה, דמיון,
                ומחזק את הקשר המיוחד בין הורים לילדים דרך חוויות משותפות ושיח מעשיר.
              </p>

              <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full mt-12" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}