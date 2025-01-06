import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation({ 
  delay = 0, 
  threshold = 0.1,
  rootMargin = '-10% 0px -10% 0px'
}: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [delay, threshold, rootMargin]);

  return ref;
}