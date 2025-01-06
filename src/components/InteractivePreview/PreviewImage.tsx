import React, { useState } from 'react';
import { Modal } from './Modal';
import { MobilePreview } from './MobilePreview';
import { ZoomIn } from 'lucide-react';
import { bookPages } from './previewData';

interface PreviewImageProps {
  src: string;
  alt: string;
  isTransitioning?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PreviewImage({ 
  src, 
  alt,
  isTransitioning,
  currentPage,
  onPageChange 
}: PreviewImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <div 
        className="relative w-full h-full bg-gradient-to-br from-purple-50 to-white cursor-zoom-in" 
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="הגדל תמונה"
        >
          <ZoomIn className="w-6 h-6 text-purple-900" />
        </button>
      </div>

      {isMobile ? (
        <MobilePreview
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentPage={currentPage}
          pages={bookPages}
          onPageChange={onPageChange}
        />
      ) : (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="w-auto h-auto max-w-full max-h-full object-contain"
            />
          </div>
        </Modal>
      )}
    </>
  );
}