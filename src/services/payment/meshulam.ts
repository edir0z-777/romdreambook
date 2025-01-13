import { PaymentDetails, PaymentProvider } from './types';

// Direct payment links from Grow
const PAYMENT_LINKS = {
  single: 'https://pay.grow.link/60567760653c25001044711e6bcd57fe-MTYyMDU2NA',
  double: 'https://pay.grow.link/4b9c04456a9a7b7e2a7bd474fbdaf3f3-MTYyMDc1OQ',
  triple: 'https://pay.grow.link/d82445cd2b91b15349d1a18e060ac8af-MTYyMDc4MA'
};

export const meshulamProvider: PaymentProvider = {
  createPayment: async (details: PaymentDetails) => {
    // Determine which payment link to use based on amount
    let paymentLink = PAYMENT_LINKS.single;
    
    if (details.amount === 124) {
      paymentLink = PAYMENT_LINKS.double;
    } else if (details.amount === 175) {
      paymentLink = PAYMENT_LINKS.triple;
    }

    // Add source parameter
    const finalUrl = new URL(paymentLink);
    finalUrl.searchParams.set('source', 'grow');
    
    return finalUrl.toString();
  },

  isAvailable: () => true // Always available since we're using direct links
};