import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollSection({ children, className = '' }: ScrollSectionProps) {
  const ref = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ${className}`}
    >
      {children}
    </section>
  );
}