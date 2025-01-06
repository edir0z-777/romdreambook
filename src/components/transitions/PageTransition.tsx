import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change with a subtle delay
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50); // Reduced delay for smoother transition

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div className="page-transition-enter">
      {children}
    </div>
  );
}