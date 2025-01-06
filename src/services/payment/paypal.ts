import { PaymentDetails, PaymentProvider } from './types';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

export const paypalProvider: PaymentProvider = {
  createPayment: async (details: PaymentDetails) => {
    // Convert ILS to USD if needed
    const amount = details.currency === 'ILS' ? details.amount / 3.7 : details.amount;

    const response = await fetch('https://api.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYPAL_CLIENT_ID}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2)
          },
          description: details.description
        }],
        application_context: {
          return_url: details.successUrl,
          cancel_url: details.cancelUrl
        }
      })
    });

    const data = await response.json();
    return data.links.find((link: any) => link.rel === 'approve').href;
  },

  isAvailable: () => Boolean(PAYPAL_CLIENT_ID)
};