import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;