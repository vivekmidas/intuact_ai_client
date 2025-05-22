import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RootRedirect: React.FC = () => {
    // Clear any existing session data when component mounts
    useEffect(() => {
        const sessionId = sessionStorage.getItem('sessionId');
        console.log('RootRedirect: Current sessionId:', sessionId);
    }, []);

    const sessionId = sessionStorage.getItem('sessionId');
    const isValidSession = sessionId && sessionId.trim().length > 0;

    console.log('RootRedirect: Redirecting to:', isValidSession ? '/welcome' : '/home');

    return <Navigate to={isValidSession ? '/welcome' : '/home'} replace />;
};

export default RootRedirect;