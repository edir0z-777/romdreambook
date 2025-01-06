import React from 'react';
import { StandardPurchase } from './StandardPurchase';
import { EnterprisePurchase } from './EnterprisePurchase';
import { PrintOnDemand } from './PrintOnDemand';

export function PurchaseOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StandardPurchase />
      <EnterprisePurchase />
      <PrintOnDemand />
    </div>
  );
}