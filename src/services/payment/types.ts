export type PaymentMethod = 'meshulam' | 'paypal';

export interface PaymentDetails {
  amount: number;
  currency: 'ILS' | 'USD';
  description: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentProvider {
  createPayment: (details: PaymentDetails) => Promise<string>;
  isAvailable: () => boolean;
}