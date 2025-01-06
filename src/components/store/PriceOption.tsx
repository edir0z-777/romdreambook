import React from 'react';

interface PriceOptionProps {
  option: {
    quantity: number;
    price: number;
    discount: number;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function PriceOption({ option, isSelected, onSelect }: PriceOptionProps) {
  const pricePerUnit = option.price / option.quantity;

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl border-2 transition-all text-right ${
        isSelected 
          ? 'border-purple-600 bg-purple-50' 
          : 'border-purple-100 hover:border-purple-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-purple-900">
            {option.quantity === 1 ? 'ספר אחד' : `${option.quantity} ספרים`}
          </div>
          <div className="text-sm text-purple-700">
            ₪{pricePerUnit.toFixed(0)} / יח׳
          </div>
        </div>
        <div className="text-left">
          <div className="text-xl font-bold text-purple-600">₪{option.price}</div>
          {option.discount > 0 && (
            <div className="text-sm text-green-600">
              {option.discount}% הנחה
            </div>
          )}
        </div>
      </div>
    </button>
  );
}