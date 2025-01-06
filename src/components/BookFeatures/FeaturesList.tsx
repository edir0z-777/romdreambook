import React from 'react';
import { FeatureCard } from './FeatureCard';
import { bookFeatures } from './bookFeaturesData';
import { ScrollReveal } from '../common/ScrollReveal';

export function FeaturesList() {
  return (
    <div className="w-full bg-purple-50/80">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {bookFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <FeatureCard {...feature} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}