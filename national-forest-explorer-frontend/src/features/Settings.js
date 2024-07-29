import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';

const Settings = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            await axios.put('/settings', { username, email, password });
            setMessage("Settings updated successfully.");
        } catch (error) {
            setMessage("Failed to update settings.");
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await axios.delete('/settings');
                navigate('/login');
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