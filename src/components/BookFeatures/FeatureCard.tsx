import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Download, Eye } from 'lucide-react';
import { ColoringBookViewer } from './ColoringBookViewer';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  downloadUrl?: string;
}

export function FeatureCard({ icon: Icon, title, description, downloadUrl }: FeatureCardProps) {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm p-3 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center h-full">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center mb-3">
            <Icon className="w-full h-full text-purple-600" strokeWidth={1.5} />
          </div>
          <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-2 text-purple-900">{title}</h3>
          <p className="text-sm md:text-lg text-purple-700 leading-tight mb-3">{description}</p>
          {downloadUrl && (
            <button
              onClick={() => setShowViewer(true)}
              className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-bold transition-colors mt-2 text-base md:text-lg"
            >
              <Eye className="w-5 h-5" />
              <span className="border-b-2 border-purple-300 hover:border-purple-700 transition-colors">
                להורדת החוברת
              </span>
            </button>
          )}
        </div>
      </div>

      {showViewer && downloadUrl && (
        <ColoringBookViewer
          url={downloadUrl}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
}