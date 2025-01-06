import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-purple-600" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-purple-900 mb-2">
            {title}
          </h3>
          <p className="text-base md:text-lg text-purple-700 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}