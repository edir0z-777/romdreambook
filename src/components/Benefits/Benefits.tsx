import React from 'react';
import { BenefitCard } from './BenefitCard';
import { benefits } from './benefitsData';
import { SectionTitle } from '../common/SectionTitle';
import { ScrollReveal } from '../common/ScrollReveal';

export function Benefits() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            title="היתרונות החינוכיים"
            subtitle="הספר תורם להתפתחות הילד במגוון תחומים"
            className="mb-8 md:mb-12"
          />
        </ScrollReveal>
      </div>

      <div className="w-full bg-purple-50/80">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <BenefitCard {...benefit} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}