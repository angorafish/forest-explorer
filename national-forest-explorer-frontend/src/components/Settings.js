import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/axiosConfig';

const Settings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/settings', { email, password });
            setMessage("Settings updated successfully.");
        } catch (error) {
            setMessage("Failed to update settings.");
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
            </form>
            {message && <div>{message}</div>}
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default Settings;