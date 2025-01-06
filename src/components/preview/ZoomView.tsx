import React from 'react';
import { ZoomButton } from './ZoomButton';

interface ZoomViewProps {
  image: {
    src: string;
    alt: string;
  };
  onClose: () => void;
}

export function ZoomView({ image, onClose }: ZoomViewProps) {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95"
      onClick={onClose}
    >
      <div className="h-full pt-20 pb-8 px-4">
        <div 
          className="h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      <ZoomButton 
        isZoomed={true}
        onClick={onClose}
      />
    </div>
  );
}