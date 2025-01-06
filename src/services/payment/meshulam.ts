import { PaymentDetails, PaymentProvider } from './types';
import { meshulamConfig } from './config';

export const meshulamProvider: PaymentProvider = {
  createPayment: async (details: PaymentDetails) => {
    if (!meshulamConfig.apiKey || !meshulamConfig.pageCode) {
      throw new Error('Meshulam configuration is missing');
    }

    try {
      const response = await fetch(`${meshulamConfig.baseUrl}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${meshulamConfig.apiKey}`
        },
        body: JSON.stringify({
          pageCode: meshulamConfig.pageCode,
          amount: details.amount,
          description: details.description,
          successUrl: details.successUrl,
          cancelUrl: details.cancelUrl,
          currency: 'ILS'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment creation failed');
      }

      const data = await response.json();
      return data.paymentUrl;
    } catch (error) {
      console.error('Meshulam payment error:', error);
      throw new Error('אירעה שגיאה ביצירת התשלום. אנא נסו שוב מאוחר יותר.');
    }
  },

  isAvailable: () => Boolean(meshulamConfig.apiKey && meshulamConfig.pageCode)
};