import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
];

export function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-purple-300 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-purple-200">
            © 2024 עולם החלומות של רומי. כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}