import React, { useState, useEffect } from 'react';
import { ImageViewer } from './ImageViewer';
import { Controls } from './Controls';
import { Caption } from './Caption';

interface FullScreenPreviewProps {
  images: Array<{
    image: { src: string; alt: string };
    title: string;
    description: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function FullScreenPreview({ 
  images, 
  currentIndex, 
  onClose, 
  onNavigate 
}: FullScreenPreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isZoomed) {
        if (e.key === 'ArrowLeft') onNavigate((currentIndex + 1) % images.length);
        if (e.key === 'ArrowRight') onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images.length, onClose, onNavigate, isZoomed]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <ImageViewer
        src={current.image.src}
        alt={current.image.alt}
        isZoomed={isZoomed}
        onZoomToggle={() => setIsZoomed(!isZoomed)}
      />

      <Controls
        total={images.length}
        current={currentIndex}
        isZoomed={isZoomed}
        onClose={onClose}
        onZoomToggle={() => setIsZoomed(!isZoomed)}
        onNext={() => onNavigate((currentIndex + 1) % images.length)}
        onPrev={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
      />

      <Caption
        title={current.title}
        description={current.description}
        isVisible={!isZoomed}
      />
    </div>
  );
}