import React from 'react';
import { PaymentMethod } from '../../services/payment/types';
import { CreditCard, Paypal } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  availableMethods: PaymentMethod[];
}

export function PaymentMethodSelector({ 
  selected, 
  onSelect,
  availableMethods 
}: PaymentMethodSelectorProps) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium text-purple-900 mb-3">בחר אמצעי תשלום</h4>
      <div className="grid grid-cols-2 gap-3">
        {availableMethods.includes('meshulam') && (
          <button
            onClick={() => onSelect('meshulam')}
            className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
              selected === 'meshulam'
                ? 'border-purple-600 bg-purple-50'
                : 'border-purple-200 hover:border-purple-300'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>כרטיס אשראי</span>
          </button>
        )}
        
        {availableMethods.includes('paypal') && (
          <button
            onClick={() => onSelect('paypal')}
            className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
              selected === 'paypal'
                ? 'border-purple-600 bg-purple-50'
                : 'border-purple-200 hover:border-purple-300'
            }`}
          >
            <Paypal className="w-5 h-5" />
            <span>PayPal</span>
          </button>
        )}
      </div>
    </div>
  );
}