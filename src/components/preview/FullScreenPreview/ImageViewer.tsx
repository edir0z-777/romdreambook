import React from 'react';
import { useGestures } from '../../../hooks/useGestures';

interface ImageViewerProps {
  src: string;
  alt: string;
  isZoomed: boolean;
  onZoomToggle: () => void;
}

export function ImageViewer({ src, alt, isZoomed, onZoomToggle }: ImageViewerProps) {
  const { scale, position, handlers } = useGestures();

  return (
    <div 
      className="h-full flex items-center justify-center"
      {...handlers}
    >
      <div 
        className={`relative max-w-[90vw] max-h-[90vh] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={onZoomToggle}
      >
        <img
          src={src}
          alt={alt}
          className="w-auto h-auto max-w-full max-h-full object-contain select-none"
          style={{ 
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: scale === 1 ? 'transform 0.3s' : 'none'
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}