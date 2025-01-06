import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useGestures } from '../../hooks/useGestures';

interface FullScreenViewProps {
  images: Array<{
    image: { src: string; alt: string };
    title: string;
    description: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function FullScreenView({ 
  images, 
  currentIndex, 
  onClose, 
  onNavigate 
}: FullScreenViewProps) {
  const { scale, position, handlers } = useGestures();
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      handlers.onTouchStart(e);
      return;
    }
    if (scale > 1) {
      handlers.onTouchStart(e);
      return;
    }
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      handlers.onTouchMove(e);
      return;
    }
    if (scale > 1) {
      handlers.onTouchMove(e);
      return;
    }
    const delta = e.touches[0].clientX - touchStart;
    setTouchDelta(delta);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handlers.onTouchEnd(e);
    
    if (scale > 1 || e.touches.length > 0) return;

    const threshold = window.innerWidth * 0.2;
    if (Math.abs(touchDelta) > threshold) {
      if (touchDelta > 0) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else {
        onNavigate((currentIndex + 1) % images.length);
      }
    }
    setTouchDelta(0);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] bg-black/95 overscroll-none touch-none"
      onClick={handleBackgroundClick}
    >
      {/* Top Controls */}
      <div className="fixed top-4 right-4 z-[101]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 text-white/90 hover:text-white transition-colors rounded-full bg-black/20 backdrop-blur-sm"
          aria-label="סגור"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="fixed top-4 left-4 z-[101] px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white/90">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Content */}
      <div 
        className="h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            transform: scale === 1 ? `translateX(${touchDelta}px)` : 'none',
            transition: touchDelta === 0 ? 'transform 0.3s' : 'none'
          }}
        >
          <img
            src={current.image.src}
            alt={current.image.alt}
            className="max-w-full max-h-full object-contain select-none"
            style={{ 
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: scale === 1 ? 'transform 0.3s' : 'none'
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Caption - Only visible when not zoomed */}
      {scale === 1 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 text-center text-white bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-2xl font-bold mb-2">{current.title}</h3>
          <p className="text-lg text-white/90">{current.description}</p>
        </div>
      )}
    </div>,
    document.body
  );
}