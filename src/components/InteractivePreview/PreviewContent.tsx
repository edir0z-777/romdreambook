import React from 'react';
import { PreviewImage } from './PreviewImage';
import { HebrewText } from '../common/HebrewText';

interface PreviewContentProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  isTransitioning?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PreviewContent({ 
  image, 
  title, 
  description, 
  isTransitioning,
  currentPage,
  onPageChange
}: PreviewContentProps) {
  return (
    <div className="relative w-full h-full">
      <PreviewImage 
        src={image.src}
        alt={image.alt}
        isTransitioning={isTransitioning}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white text-right">
        <HebrewText component="h3" className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
          {title}
        </HebrewText>
        <HebrewText component="p" className="text-base md:text-lg text-white/90">
          {description}
        </HebrewText>
      </div>
    </div>
  );
}