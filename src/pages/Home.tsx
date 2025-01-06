import React from 'react';
import { Hero } from '../components/Hero';
import { BookFeatures } from '../components/BookFeatures/BookFeatures';
import { Benefits } from '../components/Benefits/Benefits';
import { PreviewSection } from '../components/preview/PreviewSection';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50" dir="rtl">
      <Hero />
      <BookFeatures />
      <Benefits />
      <PreviewSection />
    </div>
  );
}