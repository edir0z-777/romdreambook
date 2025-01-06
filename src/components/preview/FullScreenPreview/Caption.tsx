import React from 'react';

interface CaptionProps {
  title: string;
  description: string;
  isVisible: boolean;
}

export function Caption({ title, description, isVisible }: CaptionProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 text-center text-white bg-gradient-to-t from-black/80 to-transparent z-[60]">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg text-white/90">{description}</p>
    </div>
  );
}