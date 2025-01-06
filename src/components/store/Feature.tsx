import React from 'react';
import { Check } from 'lucide-react';

interface FeatureProps {
  text: string;
}

export function Feature({ text }: FeatureProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Check className="w-5 h-5 md:w-6 md:h-6 text-purple-600 shrink-0" />
      <span className="text-base md:text-lg text-purple-800">{text}</span>
    </div>
  );
}