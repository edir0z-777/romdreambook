import React from 'react';

export function BookStoryContent() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="text-xl md:text-2xl text-purple-900 leading-relaxed mb-12">
        כאמא טרייה, הבנתי את החשיבות של שיח משמעותי עם ילדים.
        יצרתי ספר שמעודד דיאלוג, מחשבה ודמיון.
      </p>
      
      <div className="bg-purple-50/80 p-8 rounded-xl">
        <h3 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6 text-center">
          ״עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי״
        </h3>
        
        <div className="flex flex-col items-center">
          <p className="text-lg md:text-xl text-purple-800 mb-6">
            בכל עמוד בספר תמצאו תוכן אינטראקטיבי מיוחד:
          </p>
          
          <ul className="space-y-4 text-lg text-purple-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              שאלות מנחות לשיח משמעותי
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              משימות משותפות להורים וילדים
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              פעילויות מעשירות ומהנות
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}