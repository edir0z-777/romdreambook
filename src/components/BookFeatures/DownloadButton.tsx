import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  href: string;
  text: string;
}

export function DownloadButton({ href, text }: DownloadButtonProps) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm md:text-base font-bold transition-colors mt-2"
    >
      <Download className="w-4 h-4" />
      <span className="border-b border-purple-300 hover:border-purple-700 transition-colors">
        {text}
      </span>
    </a>
  );
}