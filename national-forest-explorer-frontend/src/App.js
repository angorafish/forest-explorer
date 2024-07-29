import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './features/authentication/AuthContext';
import NavBar from './features/layout/NavBar';
import Home from './features/home/Home';
import LoginSignup from './features/authentication/LoginSignup';
import Profile from './features/users/Profile';
import Posts from './features/posts/Posts';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import Settings from './features/settings/Settings';
import PostDetails from './features/posts/PostDetails';
import Explore from './features/explore/Explore';
import Trails from './features/explore/Trails';
import OtherProfile from './features/users/OtherProfile';
import Notifications from './features/notifications/Notification';
import Details from './features/explore/Details';
import Saved from './features/saved/Saved';
import axios from './services/axiosConfig';
import socket from './services/socketConfig';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    const { currentUser, setCurrentUser, notificationCount, setNotificationCount } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setCurrentUser(response.data);
                socket.emit('join', response.data.id);
            }).catch((error) => {
                localStorage.removeItem('token');
            });
        }
    }, [setCurrentUser]);

    useEffect(() => {
        if (currentUser) {
            axios.get('/notifications').then(response => {
                const unreadCount = response.data.filter(notification => notification.status === 'unread').length;
                setNotificationCount(unreadCount);
            }).catch(error => {
                console.error('Error fetching notifications:', error);
            });

            socket.on('new_notification', () => {
                setNotificationCount(prevCount => prevCount + 1);
            });

            return () => {
                socket.off('new_notification');
            };
        }
    }, [currentUser, setNotificationCount]);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/profile/:username" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/my-profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/trails" element={<Trails />} />
                <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
                <Route path="/details/:type/:id" element={<Details />} />
                <Route path="/saved" element={<ProtectedRoute element={<Saved />} />} />
            </Routes>
        </Router>
    );
}

export default App;