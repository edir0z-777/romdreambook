import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-4">
          <Icon className="w-full h-full text-purple-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-purple-900">{title}</h3>
        <p className="text-lg md:text-xl text-purple-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}