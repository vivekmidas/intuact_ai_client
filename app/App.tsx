import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RootRedirect from './RootRedirect';
import HomePage from './home/HomePage';
import WelcomePage from './welcome/welcome';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const sessionId = sessionStorage.getItem('sessionId');
    const isAuthenticated = sessionId && sessionId.trim().length > 0;
    console.log('ProtectedRoute: Current sessionId:', sessionId);
    if (!isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

function App() {
    useEffect(() => {
        console.log('App: Component mounted');
    }, []);

    return (
        <Router>
            <Routes>
                {/* Root route redirects based on auth state */}
                <Route path="/" element={<RootRedirect />} />

                {/* Public route */}
                <Route path="/home" element={<HomePage />} />

                {/* Protected route */}
                <Route
                    path="/welcome"
                    element={
                        <ProtectedRoute>
                            <WelcomePage />
                        </ProtectedRoute>
                    }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;