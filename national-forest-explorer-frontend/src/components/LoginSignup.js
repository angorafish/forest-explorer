import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';

const LoginSignup = ({ setCurrentUser }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isSignup ? '/auth/signup' : '/auth/login';
            const response = await axios.post(endpoint, { username, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            setCurrentUser(user);
            navigate('/');
        } catch (error) {
            console.error('Authentication failed', error);
            setError(error.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="auth-container">
            <h1>{isSignup ? 'Signup' : 'Login'}</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
