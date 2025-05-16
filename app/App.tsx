import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import App from './welcome/welcome';

const isAuthenticated = () => {
    return window.localStorage.getItem('isAuthenticated') === 'true';
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/welcome"
                    element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};