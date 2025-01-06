import React from 'react';

interface PreviewCaptionProps {
  title: string;
  description: string;
}

export function PreviewCaption({ title, description }: PreviewCaptionProps) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white text-right">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
          {title}
        </h3>
        <p className="text-base md:text-lg text-white/90">
          {description}
        </p>
      </div>
    </>
  );
}