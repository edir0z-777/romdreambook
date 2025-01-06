import React from 'react';
import { NavItem } from './NavItem';
import { navigationItems } from './navigationData';

interface NavigationProps {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="flex md:items-center flex-col md:flex-row gap-4 md:gap-6">
      {navigationItems.map((item) => (
        <NavItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          href={item.href}
          onClick={onNavigate}
        />
      ))}
    </nav>
  );
}