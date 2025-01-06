import React from 'react';
import { ZoomButton } from './ZoomButton';

interface ZoomOverlayProps {
  image: {
    src: string;
    alt: string;
  };
  onClose: () => void;
}

export function ZoomOverlay({ image, onClose }: ZoomOverlayProps) {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95"
      onClick={onClose}
    >
      <div 
        className="h-full flex items-start justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mt-20 max-w-[90vw] max-h-[calc(100vh-96px)]">
          <img 
            src={image.src}
            alt={image.alt}
            className="w-auto h-auto max-w-full max-h-full object-contain"
            style={{ objectPosition: '50% 20%' }} // Match the preview positioning
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