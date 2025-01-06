import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export function Link({ children, className = '', ...props }: LinkProps) {
  return (
    <a 
      className={`font-medium text-lg ${className}`} 
      {...props}
    >
      {children}
    </a>
  );
}