import { useState, useCallback } from 'react';
import { BookOrder } from './types';
import { PaymentMethod } from '../../services/payment/types';
import { meshulamProvider } from '../../services/payment/meshulam';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = useCallback(async (order: BookOrder) => {
    try {
      setIsProcessing(true);
      setError(null);

      if (!meshulamProvider.isAvailable()) {
        throw new Error('שירות התשלומים אינו זמין כרגע. אנא נסו שוב מאוחר יותר.');
      }

      const paymentUrl = await meshulamProvider.createPayment({
        amount: order.variant.price * order.quantity,
        currency: 'ILS',
        description: `${order.variant.name} x ${order.quantity}`,
        userId: crypto.randomUUID(),
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/store`
      });

      // Redirect to payment page
      window.location.href = paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'אירעה שגיאה בעיבוד התשלום. אנא נסו שוב.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { 
    processPayment, 
    isProcessing, 
    error
  };
}