import React from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlsProps {
  total: number;
  current: number;
  isZoomed: boolean;
  onClose: () => void;
  onZoomToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Controls({
  total,
  current,
  isZoomed,
  onClose,
  onZoomToggle,
  onNext,
  onPrev
}: ControlsProps) {
  return (
    <>
      {/* Top Controls */}
      <div className="fixed top-4 right-4 z-[60] flex items-center gap-2">
        <button
          onClick={onZoomToggle}
          className="p-2 text-white/90 hover:text-white transition-colors rounded-full bg-black/20 backdrop-blur-sm"
          aria-label={isZoomed ? 'הקטן תמונה' : 'הגדל תמונה'}
        >
          {isZoomed ? (
            <ZoomOut className="w-6 h-6" />
          ) : (
            <ZoomIn className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={onClose}
          className="p-2 text-white/90 hover:text-white transition-colors rounded-full bg-black/20 backdrop-blur-sm"
          aria-label="סגור"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="fixed top-4 left-4 z-[60] px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white/90">
        {current + 1} / {total}
      </div>

      {/* Navigation Controls */}
      {!isZoomed && (
        <>
          <button
            onClick={onPrev}
            className="fixed right-4 top-1/2 -translate-y-1/2 p-4 text-white/90 hover:text-white transition-colors rounded-full bg-black/20 backdrop-blur-sm z-[60]"
            aria-label="הקודם"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <button
            onClick={onNext}
            className="fixed left-4 top-1/2 -translate-y-1/2 p-4 text-white/90 hover:text-white transition-colors rounded-full bg-black/20 backdrop-blur-sm z-[60]"
            aria-label="הבא"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </>
      )}
    </>
  );
}