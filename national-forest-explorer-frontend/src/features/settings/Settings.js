import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import './settings.css';

// Logic for user to edit their own account settings
const Settings = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth(); // Access the current user from the Auth context
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state for UX

    // Fetch current user info and pre-fill the fields
    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    // Handle form submission for updating settings
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Check if passwords match
        if (password && password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            // Send PUT request to update user settings
            await axios.put(`${process.env.REACT_APP_API_URL}/settings`, { username, email, password });

            // Re-fetch user data to update the Auth context
            const updatedUser = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Update the currentUser context with the new data
            setCurrentUser(updatedUser.data);

            setMessage("Settings updated successfully.");
            // Optionally, redirect the user after a successful update
            setTimeout(() => navigate(`/profile/${updatedUser.data.username}`), 2000); // Redirect to profile after 2 seconds
        } catch (error) {
            setMessage("Failed to update settings: " + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                // Send DELETE request to delete user account
                await axios.delete(`${process.env.REACT_APP_API_URL}/settings`);

                // Clear current user and token from the Auth context
                setCurrentUser(null);
                localStorage.removeItem('token');

                // Display a success message
                setMessage("Account deleted successfully.");

                // Redirect to home page and show login/signup option after a short delay
                setTimeout(() => navigate('/'), 2000);
            } catch (error) {
                setMessage("Failed to delete account: " + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <form onSubmit={handleUpdate} className="settings-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" className="update-button" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                </button>
            </form>
            {message && <div className="message">{message}</div>}
            <button onClick={handleDeleteAccount} className="delete-button" disabled={isLoading}>
                Delete Account
            </button>
        </div>
    );
};

export default Settings;
