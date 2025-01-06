import React from 'react';
import { FeatureItem } from './FeatureItem';

const features = [
  'שאלות מנחות לשיח משמעותי',
  'משימות משותפות להורים וילדים',
  'פעילויות מעשירות ומהנות'
];

export function BookFeatures() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
      <p className="text-xl md:text-2xl text-purple-800 mb-4">
        בכל עמוד בספר תמצאו תוכן אינטראקטיבי מיוחד:
      </p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </ul>
    </div>
  );
}