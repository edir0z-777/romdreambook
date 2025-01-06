import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PurchaseButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/store')}
      className="flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>לרכישה מאובטחת</span>
    </button>
  );
}