import React, { useState, useRef, TouchEvent } from 'react';
import { X } from 'lucide-react';
import { BookPage } from './types';
import { useGestures } from '../../hooks/useGestures';

interface MobilePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  pages: BookPage[];
  onPageChange: (newPage: number) => void;
}

export function MobilePreview({ 
  isOpen, 
  onClose, 
  currentPage, 
  pages, 
  onPageChange 
}: MobilePreviewProps) {
  const touchStartX = useRef<number>(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const { scale, position, handlers } = useGestures();

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      handlers.onTouchStart(e);
      return;
    }
    if (scale > 1) return;
    
    touchStartX.current = e.touches[0].clientX;
    setTouchDelta(0);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      handlers.onTouchMove(e);
      return;
    }
    if (scale > 1) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    setTouchDelta(deltaX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    handlers.onTouchEnd(e);
    
    if (scale > 1 || e.touches.length > 0) return;

    const threshold = window.innerWidth * 0.2;
    if (Math.abs(touchDelta) > threshold) {
      if (touchDelta > 0 && currentPage > 0) {
        onPageChange(currentPage - 1);
      } else if (touchDelta < 0 && currentPage < pages.length - 1) {
        onPageChange(currentPage + 1);
      }
    }
    setTouchDelta(0);
  };

  if (!isOpen) return null;

  const currentImage = pages[currentPage].image;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 overscroll-none"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-10 p-2 text-white/90 hover:text-white"
        aria-label="סגור"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="absolute top-4 left-4 z-10 text-white/90">
        {currentPage + 1} / {pages.length}
      </div>

      <div 
        className="h-full w-full flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ 
            transform: `
              translateX(${scale === 1 ? touchDelta : 0}px)
              scale(${scale})
              translate(${position.x}px, ${position.y}px)
            `,
            touchAction: scale > 1 ? 'none' : 'pan-x'
          }}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-contain select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onPageChange(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`עבור לעמוד ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}