import { BookVariant } from './types';

// Bundle discount calculation
const calculateBundlePrice = (basePrice: number, quantity: number): number => {
  if (quantity === 1) return basePrice;
  if (quantity === 2) return basePrice * 1.8; // 10% off
  if (quantity >= 3) return basePrice * 2.5; // ~17% off for 3 or more
  return basePrice * quantity;
};

export const bookVariants: BookVariant[] = [
  {
    id: 'premium',
    name: 'ספר בכריכה קשה',
    price: 89,
    description: 'ספר "עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי" בכריכה קשה + תוספות',
    features: [
      'כריכה קשה יוקרתית',
      'הדפסה באיכות מעולה',
      'חוברת צביעה דיגיטלית במתנה',
      'חוברת פעילויות במתנה',
      'משלוח חינם'
    ],
    calculatePrice: calculateBundlePrice
  }
];