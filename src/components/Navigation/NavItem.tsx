import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPreview } from '../../utils/scroll';

interface NavItemProps {
  icon: LucideIcon;
  text: string;
  href: string;
  onClick?: () => void;
}

export function NavItem({ icon: Icon, text, href, onClick }: NavItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (href === '#preview') {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => scrollToPreview(), 100);
      } else {
        scrollToPreview();
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(href);
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'text-purple-600 bg-purple-50' 
          : 'hover:text-purple-600 hover:bg-purple-50/50'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-base md:text-lg font-medium">{text}</span>
    </button>
  );
}