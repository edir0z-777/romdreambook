import React from 'react';
import { Check, ShoppingCart, Loader2 } from 'lucide-react';

interface BundleCardProps {
  bundle: {
    id: string;
    quantity: number;
    totalPrice: number;
    pricePerUnit: number;
    discount: number;
    description: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onPurchase: () => void;
  isProcessing: boolean;
  error: string | null;
}

export function BundleCard({
  bundle,
  isSelected,
  onSelect,
  onPurchase,
  isProcessing,
  error
}: BundleCardProps) {
  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all ${
        isSelected 
          ? 'border-purple-600 bg-purple-50/50' 
          : 'border-purple-100 hover:border-purple-200'
      }`}
      onClick={onSelect}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-purple-900 mb-2">
          {bundle.description}
        </h3>
        <div className="text-3xl font-bold text-purple-600 mb-1">
          ₪{bundle.totalPrice}
        </div>
        {bundle.quantity > 1 && (
          <div className="text-sm text-purple-700">
            ₪{bundle.pricePerUnit} / יח׳
          </div>
        )}
        {bundle.discount > 0 && (
          <div className="mt-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {bundle.discount}% הנחה
          </div>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-purple-800">
          <Check className="w-5 h-5 text-purple-600 shrink-0" />
          <span>כריכה קשה יוקרתית</span>
        </div>
        <div className="flex items-center gap-2 text-purple-800">
          <Check className="w-5 h-5 text-purple-600 shrink-0" />
          <span>חוברת צביעה דיגיטלית במתנה</span>
        </div>
        <div className="flex items-center gap-2 text-purple-800">
          <Check className="w-5 h-5 text-purple-600 shrink-0" />
          <span>חוברת פעילויות במתנה</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPurchase();
        }}
        disabled={isProcessing || !isSelected}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>מעבד...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>לרכישה</span>
          </>
        )}
      </button>

      {error && isSelected && (
        <div className="mt-3 p-2 bg-red-50 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}