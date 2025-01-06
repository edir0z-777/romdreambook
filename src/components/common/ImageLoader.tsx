import React from 'react';

interface ImageLoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
};

export function ImageLoader({ size = 'md' }: ImageLoaderProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`animate-spin rounded-full border-4 border-purple-600 border-t-transparent ${sizes[size]}`} />
    </div>
  );
}