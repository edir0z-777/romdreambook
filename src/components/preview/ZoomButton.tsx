import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomButtonProps {
  isZoomed: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function ZoomButton({ isZoomed, onClick }: ZoomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg 
        transition-opacity duration-300
        ${isZoomed 
          ? 'fixed top-24 right-4 opacity-100 z-[60]' 
          : 'absolute top-4 right-4 opacity-0 group-hover:opacity-100'
        }
      `}
      aria-label={isZoomed ? 'הקטן תמונה' : 'הגדל תמונה'}
    >
      {isZoomed ? (
        <ZoomOut className="w-6 h-6 text-purple-900" />
      ) : (
        <ZoomIn className="w-6 h-6 text-purple-900" />
      )}
    </button>
  );
}