import React from 'react';
import { FeatureCard } from './FeatureCard';
import { bookFeatures } from './featuresData';

export function FeaturesList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {bookFeatures.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          downloadUrl={feature.downloadUrl}
        />
      ))}
    </div>
  );
}