import React from 'react';

interface FeatureItemProps {
  text: string;
}

export function FeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3">
      <span className="w-2.5 h-2.5 bg-purple-400 rounded-full" />
      <span className="text-lg md:text-xl text-purple-700">{text}</span>
    </li>
  );
}