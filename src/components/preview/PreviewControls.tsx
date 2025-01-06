import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PreviewControlsProps {
  onNext: () => void;
  onPrev: () => void;
  disabled?: boolean;
}

export function PreviewControls({ onNext, onPrev, disabled }: PreviewControlsProps) {
  const buttonClass = "absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed z-10";

  return (
    <>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        disabled={disabled}
        className={`${buttonClass} right-4 md:right-6`}
        aria-label="העמוד הקודם"
      >
        <ChevronRight className="w-6 h-6 text-purple-900" />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        disabled={disabled}
        className={`${buttonClass} left-4 md:left-6`}
        aria-label="העמוד הבא"
      >
        <ChevronLeft className="w-6 h-6 text-purple-900" />
      </button>
    </>
  );
}