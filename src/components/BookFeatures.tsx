import React from 'react';
import { Star, Heart, Sparkles, Brain } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'שנת סיפור לילדים בוודאות',
    description: 'סיפורים מרגיעים במיוחד לשעת השינה'
  },
  {
    icon: Heart,
    title: 'חוברת יצירה להדפסה במתנה',
    description: 'פעילויות יצירה מהנות לילדים'
  },
  {
    icon: Sparkles,
    title: 'משלוח לילדים לאורך הספר ליצירת שיח',
    description: 'תוכן חינוכי ומעשיר'
  },
  {
    icon: Brain,
    title: 'דף רקע בסוף הספר לחלומות המקסימים של הילדים',
    description: 'העשרה והעמקת החוויה'
  }
];

export function BookFeatures() {
  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-purple-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}