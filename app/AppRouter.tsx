import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './welcome/welcome';
import { Home } from './pages/Home';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<ProtectedRoute><App /></ProtectedRoute>} />
    </Routes>
  );
};