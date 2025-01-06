import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { PreviewGallery } from './PreviewGallery';
import { ScrollReveal } from '../common/ScrollReveal';

export function PreviewSection() {
  return (
    <section id="preview" className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <SectionTitle 
            title="הצצה לספר"
            subtitle="דפדפו בין העמודים לטעימה קטנה"
            className="mb-12"
          />
        </ScrollReveal>

        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={200}>
            <PreviewGallery />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}