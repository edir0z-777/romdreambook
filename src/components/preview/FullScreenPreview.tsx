import React, { useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { bookPages } from './previewData';

interface FullScreenPreviewProps {
  currentPage: number;
  onClose: () => void;
  onPageChange: (page: number) => void;
}

export function FullScreenPreview({ 
  currentPage, 
  onClose, 
  onPageChange 
}: FullScreenPreviewProps) {
  const current = bookPages[currentPage];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPageChange((currentPage + 1) % bookPages.length);
      if (e.key === 'ArrowRight') onPageChange((currentPage - 1 + bookPages.length) % bookPages.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentPage, onClose, onPageChange]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] p-2 text-white/90 hover:text-white transition-colors"
        aria-label="סגור"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Page Counter */}
      <div className="absolute top-4 left-4 z-[101] text-white/90">
        {currentPage + 1} / {bookPages.length}
      </div>

      {/* Main Image */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <img
          src={current.image.src}
          alt={current.image.alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => onPageChange((currentPage - 1 + bookPages.length) % bookPages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] p-4 text-white/90 hover:text-white transition-colors"
        aria-label="הקודם"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
      <button
        onClick={() => onPageChange((currentPage + 1) % bookPages.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] p-4 text-white/90 hover:text-white transition-colors"
        aria-label="הבא"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-2xl font-bold mb-2">{current.title}</h3>
        <p className="text-lg text-white/90">{current.description}</p>
      </div>
    </div>
  );
}