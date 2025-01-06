import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { AuthorCard } from './AuthorCard';

export function AuthorStory() {
  return (
    <section className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="קצת עליי"
          className="mb-12"
        />
        <div className="max-w-6xl mx-auto">
          <AuthorCard />
        </div>
      </div>
    </section>
  );
}