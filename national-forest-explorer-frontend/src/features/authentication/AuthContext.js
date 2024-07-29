import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../services/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0);

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
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, notificationCount, setNotificationCount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
