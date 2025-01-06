import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Download } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  downloadUrl?: string;
}

export function FeatureCard({ icon: Icon, title, description, downloadUrl }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 mb-4 text-purple-600">
          <Icon className="w-full h-full" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">
          {title}
        </h3>
        
        <p className="text-lg md:text-xl text-purple-700 mb-4">
          {description}
        </p>

        {downloadUrl && (
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            download
          >
            <Download className="w-4 h-4" />
            <span>להורדת החוברת</span>
          </a>
        )}
      </div>
    </div>
  );
}