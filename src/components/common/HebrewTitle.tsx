import React from 'react';
import { HebrewText } from './HebrewText';

interface HebrewTitleProps {
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function HebrewTitle({ 
  className = '',
  level = 1
}: HebrewTitleProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HebrewText 
      component={Component}
      className={`hebrew-title ${className}`}
    >
      עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי
    </HebrewText>
  );
}