import React from 'react';
import { HebrewText } from './HebrewText';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <HebrewText component="h2" className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
        {title}
      </HebrewText>
      {subtitle && (
        <HebrewText component="p" className="text-xl text-purple-700">
          {subtitle}
        </HebrewText>
      )}
    </div>
  );
}