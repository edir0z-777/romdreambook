import React from 'react';
import { HebrewTitle } from '../common/HebrewTitle';
import { PurchaseButton } from '../PurchaseButton';

export function HeroContent() {
  return (
    <div className="flex-1 flex flex-col items-center order-2 md:order-1 text-center">
      <HebrewTitle className="text-4xl md:text-6xl lg:text-7xl text-purple-900 mb-4 md:mb-6" />
      <p className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-700 mb-6 md:mb-8 leading-relaxed" lang="he">
        לַחֲלוֹמוֹת אֵין גְּבוּל, הֵם מְלֵאֵי דִּמְיוֹנוֹת
      </p>
      <PurchaseButton />
    </div>
  );
}