import React from 'react';
import { IMAGES } from '../../../../constants/images';

export function QuoteImage() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-100 rounded-full blur-3xl opacity-20 animate-pulse" />
      <img
        {...IMAGES.ROMI}
        className="w-full h-full object-contain relative z-10 transform hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}