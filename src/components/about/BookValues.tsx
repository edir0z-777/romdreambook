import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { ValueCard } from './ValueCard';
import { bookValues } from './bookValuesData';

export function BookValues() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="היתרונות של הספר"
          subtitle="חוויה חינוכית שתורמת להתפתחות הילד"
          className="mb-8 md:mb-12"
        />
      </div>

      <div className="w-full bg-purple-50/80">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {bookValues.map((value, index) => (
                <ValueCard
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}