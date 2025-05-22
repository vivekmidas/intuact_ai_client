import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log('ProtectedRoute:', {
            isAuthenticated,
            sessionId: sessionStorage.getItem('sessionId'),
            path: location.pathname
        });
    }, [isAuthenticated, location]);

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to home');
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};