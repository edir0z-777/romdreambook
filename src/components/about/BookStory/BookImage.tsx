import React from 'react';
import { IMAGES } from '../../../constants/images';

export function BookImage() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      <div className="absolute inset-0 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <img
        {...IMAGES.ROMI}
        className="w-full h-full object-contain relative z-10 transform hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}