import React from 'react';
import { Sparkles, Heart, MessageCircle, Star } from 'lucide-react';

const highlights = [
  {
    icon: Sparkles,
    title: 'פיתוח דמיון',
    text: 'מעודד חשיבה יצירתית'
  },
  {
    icon: Heart,
    title: 'חיבור רגשי',
    text: 'מחזק את הקשר המשפחתי'
  },
  {
    icon: MessageCircle,
    title: 'שיח מעשיר',
    text: 'מפתח כישורי שפה ותקשורת'
  },
  {
    icon: Star,
    title: 'חוויה לימודית',
    text: 'משלב למידה והנאה'
  }
];

export function BookHighlights() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
      {highlights.map((highlight, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center text-center bg-purple-50 p-6 rounded-xl"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4">
            <highlight.icon className="w-full h-full text-purple-600" strokeWidth={1.5} />
          </div>
          <h4 className="text-lg md:text-xl font-bold text-purple-900 mb-2">
            {highlight.title}
          </h4>
          <p className="text-base md:text-lg text-purple-700">
            {highlight.text}
          </p>
        </div>
      ))}
    </div>
  );
}