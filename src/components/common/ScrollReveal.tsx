import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0 
}: ScrollRevealProps) {
  const ref = useScrollAnimation({ delay });

  return (
    <div 
      ref={ref}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </div>
  );
}