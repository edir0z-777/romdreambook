import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { FeaturesList } from './FeaturesList';
import { ScrollReveal } from '../common/ScrollReveal';

export function BookFeatures() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            title="מה מקבלים בספר?"
            className="mb-8 md:mb-12"
          />
        </ScrollReveal>

        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={200}>
            <FeaturesList />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}