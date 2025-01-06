import React from 'react';
import { Check } from 'lucide-react';

interface FeatureProps {
  text: string;
}

export function Feature({ text }: FeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <Check className="w-6 h-6 text-purple-600 shrink-0" />
      <span className="text-lg text-purple-800">{text}</span>
    </div>
  );
}