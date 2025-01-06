import React from 'react';
import { LucideIcon } from 'lucide-react';
import { DownloadButton } from './DownloadButton';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  downloadUrl?: string;
}

export function FeatureCard({ icon: Icon, title, description, downloadUrl }: FeatureCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-3 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center h-full">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center mb-3">
          <Icon className="w-full h-full text-purple-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-2 text-purple-900">{title}</h3>
        <p className="text-sm md:text-lg text-purple-700 leading-tight mb-3">{description}</p>
        {downloadUrl && (
          <DownloadButton 
            href={downloadUrl}
            text="להורדת החוברת"
          />
        )}
      </div>
    </div>
  );
}