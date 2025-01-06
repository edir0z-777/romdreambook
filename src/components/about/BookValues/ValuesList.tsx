import React from 'react';
import { ValueCard } from './ValueCard';
import { bookValues } from './valuesData';

export function ValuesList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {bookValues.map((value, index) => (
        <ValueCard
          key={index}
          icon={value.icon}
          title={value.title}
          description={value.description}
        />
      ))}
    </div>
  );
}