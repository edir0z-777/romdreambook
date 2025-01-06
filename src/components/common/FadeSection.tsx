import React from 'react';
import { useScrollFade } from '../../hooks/useScrollFade';

interface FadeSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeSection({ children, className = '' }: FadeSectionProps) {
  const sectionRef = useScrollFade();

  return (
    <section
      ref={sectionRef}
      className={`transition-opacity duration-700 ${className}`}
    >
      {children}
    </section>
  );
}