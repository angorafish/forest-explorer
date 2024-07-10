import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ currentUser, element }) => {
    const token = localStorage.getItem('token');
    let isAuthenticated = false;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isAuthenticated = !!decodedToken;
        } catch (error) {
            console.error('Invalid token', error);
        }
    }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
