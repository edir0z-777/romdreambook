export interface BookVariant {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  calculatePrice: (basePrice: number, quantity: number) => number;
}

export interface BookOrder {
  variant: BookVariant;
  quantity: number;
}