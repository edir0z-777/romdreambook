import { useState, useRef, TouchEvent } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useGestures(minScale = 1, maxScale = 3) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  
  const gestureRef = useRef({
    startDistance: 0,
    startScale: 1,
    startPosition: { x: 0, y: 0 },
    lastPosition: { x: 0, y: 0 },
    isPinching: false,
    isMoving: false
  });

  const getDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const constrainPosition = (x: number, y: number, currentScale: number) => {
    // Calculate the maximum allowed movement based on the current scale
    const maxX = Math.max(0, (window.innerWidth * (currentScale - 1)) / 2);
    const maxY = Math.max(0, (window.innerHeight * (currentScale - 1)) / 2);

    // Constrain the position within the boundaries
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y))
    };
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      gestureRef.current.isPinching = true;
      gestureRef.current.startDistance = getDistance(e.touches);
      gestureRef.current.startScale = scale;
      gestureRef.current.startPosition = position;
    } else if (scale > 1) {
      gestureRef.current.isMoving = true;
      gestureRef.current.startPosition = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (gestureRef.current.isPinching && e.touches.length === 2) {
      const distance = getDistance(e.touches);
      const newScale = Math.min(
        maxScale,
        Math.max(
          minScale,
          (gestureRef.current.startScale * distance) / gestureRef.current.startDistance
        )
      );
      setScale(newScale);

      // Calculate center point between touches
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      
      const constrained = constrainPosition(
        (window.innerWidth / 2 - centerX) * (newScale - 1),
        (window.innerHeight / 2 - centerY) * (newScale - 1),
        newScale
      );
      
      setPosition(constrained);
    } else if (gestureRef.current.isMoving && scale > 1) {
      const newX = e.touches[0].clientX - gestureRef.current.startPosition.x;
      const newY = e.touches[0].clientY - gestureRef.current.startPosition.y;

      const constrained = constrainPosition(newX, newY, scale);
      setPosition(constrained);
    }
  };

  const handleTouchEnd = () => {
    if (gestureRef.current.isPinching) {
      gestureRef.current.isPinching = false;
      if (scale <= 1.1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    }
    gestureRef.current.isMoving = false;
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