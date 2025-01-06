import React from 'react';
import { SectionTitle } from '../../common/SectionTitle';
import { StoryContent } from './StoryContent';
import { BookQuote } from './BookQuote';

export function BookStory() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="הסיפור שמאחורי הספר"
            className="mb-12"
          />
          
          <div className="space-y-12">
            <StoryContent />
            <BookQuote />
          </div>
        </div>
      </div>
    </section>
  );
}