import React from 'react';
import { HebrewTitle } from '../../common/HebrewTitle';
import { BookFeaturesList } from './BookFeaturesList';

export function BookContent() {
  return (
    <div className="bg-purple-50/80 rounded-xl p-6 md:p-8">
      <HebrewTitle 
        level={3}
        className="text-2xl md:text-4xl font-bold text-purple-900 mb-8"
      />
      
      <BookFeaturesList />
    </div>
  );
}