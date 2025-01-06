import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { FullScreenView } from './FullScreenView';
import { bookPages } from './previewData';

interface PreviewImageProps {
  image: {
    src: string;
    alt: string;
  };
  isTransitioning: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PreviewImage({ 
  image, 
  isTransitioning,
  currentPage,
  onPageChange 
}: PreviewImageProps) {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <>
      <div 
        className="relative w-full h-full bg-gradient-to-br from-purple-50 to-white cursor-zoom-in" 
        onClick={() => setShowFullScreen(true)}
      >
        <img 
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover object-top transition-all duration-500 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFullScreen(true);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="הגדל תמונה"
        >
          <ZoomIn className="w-6 h-6 text-purple-900" />
        </button>
      </div>

      {showFullScreen && (
        <FullScreenView
          images={bookPages}
          currentIndex={currentPage}
          onClose={() => setShowFullScreen(false)}
          onNavigate={onPageChange}
        />
      )}
    </>
  );
}