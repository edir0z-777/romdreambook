import React from 'react';

export function Logo() {
  return (
    <div className="flex flex-col items-center text-center">
      <img 
        src="https://i.ibb.co/VvLNYxZ/romi-logo.png" 
        alt="רומי" 
        className="w-24 h-auto mb-2"
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-1">עולם החלומות של רומי</h1>
        <p className="text-lg opacity-90">מאת: ענת רוזנשטיין</p>
      </div>
    </div>
  );
}