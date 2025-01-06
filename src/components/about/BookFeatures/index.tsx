import React from 'react';
import { SectionTitle } from '../../common/SectionTitle';
import { FeaturesList } from './FeaturesList';

export function BookFeatures() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="מה מקבלים בספר?"
          className="mb-6 md:mb-8"
        />
        
        <div className="max-w-6xl mx-auto">
          <FeaturesList />
        </div>
      </div>
    </section>
  );
}