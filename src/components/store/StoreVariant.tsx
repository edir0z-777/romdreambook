import React from 'react';
import { Check } from 'lucide-react';
import { BookVariant } from './types';

interface StoreVariantProps {
  variant: BookVariant;
  isSelected: boolean;
  onSelect: () => void;
}

export function StoreVariant({ variant, isSelected, onSelect }: StoreVariantProps) {
  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-lg ${
        isSelected 
          ? 'border-purple-600 bg-purple-50/50' 
          : 'border-purple-100 hover:border-purple-200'
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-4 left-4">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">
          {variant.name}
        </h3>
        <p className="text-2xl md:text-3xl font-bold text-purple-600">
          ₪{variant.price}
        </p>
      </div>

      <p className="text-purple-700 mb-4">{variant.description}</p>

      <ul className="space-y-2">
        {variant.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-purple-800">
            <Check className="w-5 h-5 text-purple-600 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}