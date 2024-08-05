import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { useAuth } from './AuthContext';
import './authentication.css';

// Handle logic on login and signup pages
const LoginSignup = () => {
    const { setCurrentUser } = useAuth();
    // State to manage if form is for signup or login
    const [isSignup, setIsSignup] = useState(false);
    // State to manage form inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // State to manage error and success messages
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate password format
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Handle form submission for both login and signup forms
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation checks
        if (isSignup && password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (isSignup && !validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }
        if (isSignup && !validatePassword(password)) {
            setError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        try {
            const endpoint = isSignup ? '/auth/signup' : '/auth/login';
            const data = isSignup ? { username, email, password } : { username, password };
            console.log(`Sending request to ${endpoint} with data:`, data);
            const response = await axios.post(endpoint, data);
            const { token, user } = response.data;
        

            localStorage.setItem('token', token);
            console.log('Token stored in localStorage:', token);
            setCurrentUser(user);

            if (isSignup) {
                setSuccess("Account created!");
                setTimeout(() => {
                    setSuccess(null);
                    navigate('/');
                }, 2000);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Authentication failed', error);
            setError(error.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="auth-container">
            <h1>{isSignup ? 'Signup' : 'Login'}</h1>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {isSignup && (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            </form>
            <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? 'Login' : 'Signup'}
                </button>
            </p>
        </div>
    );
};

export default LoginSignup;