import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { PageTransition } from '../components/transitions/PageTransition';

export function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      {routes.map(({ path, component: Component }) => (
        <Route 
          key={path} 
          path={path} 
          element={
            <PageTransition>
              <Component />
            </PageTransition>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}