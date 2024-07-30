import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './features/authentication/AuthContext';
import App from './App';

// Renders the root component with the AuthProvider to provide authentication context to the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);