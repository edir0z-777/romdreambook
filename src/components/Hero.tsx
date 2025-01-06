import React from 'react';
import { BookCover } from './Hero/BookCover';
import { HeroContent } from './Hero/HeroContent';
import { IMAGES } from '../constants/images';

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-start md:items-center bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 py-8 md:py-0">
          <div className="flex-1 flex flex-col items-center order-2 md:order-1 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-purple-900 mb-4 md:mb-6 font-bold">
              עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-700 mb-6 md:mb-8 leading-relaxed" lang="he">
              לַחֲלוֹמוֹת אֵין גְּבוּל, הֵם מְלֵאֵי דִּמְיוֹנוֹת
            </p>
            <button 
              onClick={() => window.location.href = '/store'}
              className="flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <span>לרכישה מאובטחת</span>
            </button>
          </div>

          <div className="flex-1 relative w-full max-w-[280px] md:max-w-[500px] mx-auto md:mx-0 order-1 md:order-2">
            <div className="aspect-square relative">
              <div className="absolute inset-0 bg-purple-600/10 blur-3xl rounded-full group-hover:bg-purple-600/20 transition-all duration-500" />
              <img
                src={IMAGES.BOOK_COVER.src}
                alt={IMAGES.BOOK_COVER.alt}
                className="w-full h-full object-contain relative z-10 transform transition-all duration-500 hover:scale-105 hover:-rotate-2"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}