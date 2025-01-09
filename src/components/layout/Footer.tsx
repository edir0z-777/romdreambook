import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: () => (
      <img 
        src="/images/whatsapp-white.png" 
        alt="WhatsApp"
        className="w-[28px] h-[28px]"
      />
    ),
    href: 'https://wa.me/message/LWSLVC2LQDFRN1',
    label: 'WhatsApp'
  },
  { 
    icon: Instagram, 
    href: 'https://www.instagram.com/anatroz.book/',
    label: 'Instagram' 
  },
  { 
    icon: Facebook, 
    href: 'https://www.facebook.com/people/%D7%A2%D7%95%D7%9C%D7%9D-%D7%94%D7%97%D7%9C%D7%95%D7%9E%D7%95%D7%AA-%D7%A9%D7%9C-%D7%A8%D7%95%D7%9E%D7%99-%D7%A1%D7%A4%D7%A8-%D7%99%D7%9C%D7%93%D7%99%D7%9D/100063802494862/',
    label: 'Facebook' 
  },
  { 
    icon: Mail, 
    href: 'mailto:anat.dubov@gmail.com',
    label: 'Email' 
  }
];

export function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-purple-300 transition-colors"
                  aria-label={link.label}
                  target={link.icon !== Mail ? '_blank' : undefined}
                  rel={link.icon !== Mail ? 'noopener noreferrer' : undefined}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
          <p className="text-purple-200">
            © 2024 עולם החלומות של רומי. כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}