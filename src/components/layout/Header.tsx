import React, { useState } from 'react';
import { Moon, Menu, X } from 'lucide-react';
import { Navigation } from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import { HebrewTitle } from '../common/HebrewTitle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            aria-label="דף הבית"
            onClick={closeMenu}
          >
            <Moon className="w-10 h-10 text-purple-600 animate-float" />
            <HebrewTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-900" />
          </Link>
          
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="תפריט"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8 text-purple-900" />
            ) : (
              <Menu className="w-8 h-8 text-purple-900" />
            )}
          </button>

          <div className="hidden md:block">
            <Navigation onNavigate={closeMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-purple-100">
          <div className="container mx-auto px-4 py-4">
            <Navigation onNavigate={closeMenu} />
          </div>
        </div>
      )}
    </header>
  );
}