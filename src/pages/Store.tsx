import React from 'react';
import { Store as StoreComponent } from '../components/store/Store';

export function Store() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col bg-gradient-to-b from-indigo-50 via-purple-50 to-purple-50" dir="rtl">
      <div className="flex-1 flex flex-col">
        <StoreComponent />
      </div>
    </div>
  );
}