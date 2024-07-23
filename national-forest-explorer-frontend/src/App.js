import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup';
import Profile from './components/Profile';
import Posts from './components/Posts';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './components/Settings';
import Trips from './components/Trips';
import PostDetails from './components/PostDetails';
import Explore from './components/Explore';
import Trails from './components/Trails';
import Campsites from './components/Campsites';
import OtherProfile from './components/OtherProfile';
import Notifications from './components/Notification';
import FriendRequests from './components/FriendRequests';
import Details from './components/Details';
import Saved from './components/Saved';
import NewTripForm from './components/NewTripForm.js';
import TripDetails from './components/TripDetails';
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
                <Route path="/itineraries" element={<ProtectedRoute element={<Trips />} />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/trails" element={<Trails />} />
                <Route path="/campsites" element={<Campsites />} />
                <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
                <Route path="/friend-requests" element={<ProtectedRoute element={<FriendRequests />} />} />
                <Route path="/details/:type/:id" element={<Details />} />
                <Route path="/saved" element={<ProtectedRoute element={<Saved />} />} />
                <Route path="/new-trip" element={<ProtectedRoute element={<NewTripForm />} />} />
                <Route path="/trip-details/:id" element={<ProtectedRoute element={<TripDetails />} />} />
            </Routes>
        </Router>
    );
}

export default App;