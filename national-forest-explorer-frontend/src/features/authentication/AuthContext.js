import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../services/axiosConfig';

const AuthContext = createContext();
// Manage and provide authentication-related state across the app
export const AuthProvider = ({ children }) => {
    // State to store current user and notification count
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notificationCount, setNotificationCount] = useState(0);

    // Fetch current user on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setCurrentUser(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, notificationCount, setNotificationCount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };