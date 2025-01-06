import React from 'react';
import { Link } from './Link';

const navItems = ['לרכישה', 'הגלריה שלכם', 'הצצה לספר', 'צור קשר'];

export function Navigation() {
  return (
    <nav className="flex items-center justify-center gap-8">
      {navItems.map((item) => (
        <Link 
          key={item} 
          href="#" 
          className="hover:text-yellow-200 transition-colors text-lg px-2 py-1 font-medium"
        >
          {item}
        </Link>
      ))}
    </nav>
  );
}