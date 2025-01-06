import React from 'react';
import { ImageAsset } from '../../types/images';

interface BookCoverProps {
  image: ImageAsset;
}

export function BookCover({ image }: BookCoverProps) {
  return (
    <div className="flex-1 relative w-full max-w-[500px] mx-auto md:mx-0 order-1 md:order-2">
      <div className="aspect-square relative">
        <div className="absolute inset-0 bg-purple-600/10 blur-3xl rounded-full group-hover:bg-purple-600/20 transition-all duration-500" />
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain relative z-10 transform transition-all duration-500 hover:scale-105 hover:-rotate-2"
          loading="eager"
        />
      </div>
    </div>
  );
}