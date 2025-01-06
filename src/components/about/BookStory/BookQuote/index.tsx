import React from 'react';
import { QuoteText } from './QuoteText';
import { QuoteImage } from './QuoteImage';

export function BookQuote() {
  return (
    <div className="bg-purple-50/80 rounded-3xl shadow-lg overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <QuoteText />
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <QuoteImage />
          </div>
        </div>
      </div>
    </div>
  );
}