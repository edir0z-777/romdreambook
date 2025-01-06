import React from 'react';

interface PreviewPaginationProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
  disabled?: boolean;
}

export function PreviewPagination({ total, current, onChange, disabled }: PreviewPaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          disabled={disabled}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            current === index 
              ? 'bg-purple-600 scale-110' 
              : 'bg-purple-200 hover:bg-purple-300'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
}