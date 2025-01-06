import React from 'react';

export function BookFeaturesList() {
  return (
    <div className="mt-6">
      <p className="text-xl md:text-2xl text-purple-800 mb-3">
        בכל עמוד בספר תמצאו תוכן אינטראקטיבי מיוחד:
      </p>
      
      <ul className="space-y-3 text-lg md:text-xl text-purple-700">
        <li className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span>
          שאלות מנחות לשיח משמעותי
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span>
          משימות משותפות להורים וילדים
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span>
          פעילויות מעשירות ומהנות
        </li>
      </ul>
    </div>
  );
}