import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Logic to protect certain routes from being visible to unauthenticated clients
const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();
    // If user is logged in, render the given element; otherwise, redirect to login
    return currentUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;