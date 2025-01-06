import { useState, useRef, TouchEvent } from 'react';

interface PinchState {
  initialDistance: number;
  currentScale: number;
}

export function usePinchZoom(minScale = 1, maxScale = 3) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pinchRef = useRef<PinchState | null>(null);

  const getDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchRef.current = {
        initialDistance: getDistance(e.touches),
        currentScale: scale
      };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const distance = getDistance(e.touches);
      const newScale = Math.min(
        maxScale,
        Math.max(
          minScale,
          (pinchRef.current.currentScale * distance) / pinchRef.current.initialDistance
        )
      );
      
      setScale(newScale);

      // Calculate center point of the two touches
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      
      setPosition({
        x: (window.innerWidth / 2 - centerX) * (newScale - 1),
        y: (window.innerHeight / 2 - centerY) * (newScale - 1)
      });
    }
  };

  const handleTouchEnd = () => {
    if (pinchRef.current) {
      pinchRef.current = null;
      if (scale < 1.1) {
        // Reset to initial state if almost at original scale
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  return {
    scale,
    position,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
}