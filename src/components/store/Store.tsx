import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { ScrollReveal } from '../common/ScrollReveal';
import { PurchaseOptions } from './PurchaseOptions';

export function Store() {
  return (
    <section className="flex flex-col h-full">
      <div className="container mx-auto px-4 py-6 md:py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle 
              title="רכישת הספר"
              subtitle="בחרו את החבילה המתאימה לכם"
              className="mb-6 md:mb-12"
            />
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <PurchaseOptions />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}