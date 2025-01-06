import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/AppRoutes';
import { Layout } from './components/layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}