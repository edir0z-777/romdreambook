import React from 'react';
import { Moon } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-white flex items-center justify-center z-50">
      <div className="text-center">
        <Moon className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-float" />
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
          עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי
        </h1>
        <div className="w-16 h-1 mx-auto bg-purple-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}