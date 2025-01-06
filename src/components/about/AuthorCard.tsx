import React from 'react';
import { AuthorImage } from './AuthorImage';
import { AuthorBio } from './AuthorBio';

export function AuthorCard() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <AuthorImage />
        <AuthorBio />
      </div>
    </div>
  );
}