import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import './settings.css';

// Logic for user to edit their own account settings
const Settings = () => {
    // React state hooks for managing form inputs and messages
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission for updating settings
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            // Send PUT request to update user settings
            await axios.put('/settings', { username, email, password });
            setMessage("Settings updated successfully.");
        } catch (error) {
            setMessage("Failed to update settings.");
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                // Send DELETE request to delete user account
                await axios.delete('/settings');
                navigate('/login'); // Redirect to login page after account deletion
            } catch (error) {
                setMessage("Failed to delete account.");
            }
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            {message && <div>{message}</div>}
            <button onClick={handleDeleteAccount} style={{ color: 'red' }}>Delete Account</button>
        </div>
    );
};

export default Settings;
