import React from 'react';

interface HebrewTextProps {
  children: React.ReactNode;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
}

export function HebrewText({ 
  children, 
  className = '', 
  component: Component = 'span' 
}: HebrewTextProps) {
  return (
    <Component 
      lang="he"
      dir="rtl"
      className={`font-hebrew leading-hebrew tracking-hebrew ${className}`}
    >
      {children}
    </Component>
  );
}