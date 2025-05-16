import React, { useState } from 'react';

interface LoginForm {
    email: string;
    password: string;
}

interface SignupForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    return (
        <header className="header">
            <button onClick={onLogout}>Logout</button>
        </header>
    );
};

export const Home: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState<SignupForm>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        window.localStorage.setItem('isAuthenticated', 'true');
        window.localStorage.setItem('userEmail', loginForm.email);
        window.location.href = '/welcome'; // Redirect without useNavigate
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (signupForm.password !== signupForm.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        window.localStorage.setItem('isAuthenticated', 'true');
        window.localStorage.setItem('userEmail', signupForm.email);
        window.location.href = '/welcome'; // Redirect without useNavigate
    };

    const handleLogout = () => {
        window.localStorage.clear();
        window.location.href = '/'; // Redirect to home page
    };

    return (
        <div className="home-container">
            <Header onLogout={handleLogout} />
            <div className="auth-section">
                <div className="auth-tabs">
                    <button
                        className={`tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLogin} className="auth-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup} className="auth-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={signupForm.username}
                            onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={signupForm.email}
                            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                )}
            </div>
        </div>
    );
};