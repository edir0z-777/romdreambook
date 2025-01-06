import React from 'react';
import { BookVariant } from './types';
import { ShoppingCart, Loader2 } from 'lucide-react';

interface OrderSummaryProps {
  variant: BookVariant;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onPurchase: () => void;
  isProcessing: boolean;
  error: string | null;
}

export function OrderSummary({ 
  variant, 
  quantity, 
  onQuantityChange,
  onPurchase,
  isProcessing,
  error
}: OrderSummaryProps) {
  const total = variant.calculatePrice(variant.price, quantity);
  const regularPrice = variant.price * quantity;
  const savings = regularPrice - total;

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-purple-900 mb-6">סיכום הזמנה</h3>
      
      <div className="flex flex-wrap gap-6 items-end justify-between mb-6">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-purple-700 mb-1">
            כמות
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            className="block w-24 rounded-lg border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            disabled={isProcessing}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="text-right">
          {quantity > 1 && (
            <div className="text-sm text-green-600 mb-1">
              חיסכון: ₪{savings.toFixed(0)}
            </div>
          )}
          <div className="text-sm text-purple-600 mb-1">סה״כ לתשלום</div>
          <div className="text-3xl font-bold text-purple-900">₪{total}</div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <button
        onClick={onPurchase}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>מעבד תשלום...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>לרכישה מאובטחת</span>
          </>
        )}
      </button>
    </div>
  );
}