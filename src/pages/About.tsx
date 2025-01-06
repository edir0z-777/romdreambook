import React from 'react';
import { ScrollSection } from '../components/common/ScrollSection';
import { AuthorStory } from '../components/about/AuthorStory';
import { BookStory } from '../components/about/BookStory';
import { BookValues } from '../components/about/BookValues';

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50" dir="rtl">
      <ScrollSection>
        <AuthorStory />
      </ScrollSection>
      
      <ScrollSection>
        <BookStory />
      </ScrollSection>
      
      <ScrollSection>
        <BookValues />
      </ScrollSection>
    </div>
  );
}