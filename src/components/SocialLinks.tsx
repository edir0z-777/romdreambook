import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <a href="#" className="hover:text-blue-200 transition-colors">
        <Facebook className="w-5 h-5" />
      </a>
      <a href="#" className="hover:text-blue-200 transition-colors">
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  );
}