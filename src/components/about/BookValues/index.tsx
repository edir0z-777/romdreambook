import React from 'react';
import { SectionTitle } from '../../common/SectionTitle';
import { ValuesList } from './ValuesList';

export function BookValues() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="היתרונות של הספר"
          subtitle="חוויה חינוכית שתורמת להתפתחות הילד"
          className="mb-12"
        />
        
        <div className="max-w-6xl mx-auto">
          <ValuesList />
        </div>
      </div>
    </section>
  );
}