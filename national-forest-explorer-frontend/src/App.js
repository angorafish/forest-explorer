import React, { useEffect, useState } from 'react';
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
import Notifications from './features/notifications/Notification';
import Details from './features/explore/Details';
import Saved from './features/saved/Saved';
import axios from './services/axiosConfig';
import socket from './services/socketConfig';
import OtherProfile from './features/users/OtherProfile';
import Forest from './features/explore/Forest';
import EditPostModal from './features/posts/EditPostModal';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    const { currentUser, setCurrentUser, setNotificationCount } = useAuth();
    const [posts, setPosts] = useState([]); // Manage posts state
    const [successMessage, setSuccessMessage] = useState(''); // Manage success message

    // Effect to fetch and set the current user on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setCurrentUser(response.data); // Set the current user state
                // Join the user to the socket room
                socket.emit('join', response.data.id);
            }).catch((error) => {
                localStorage.removeItem('token');
            });
        }
    }, [setCurrentUser]);

    // Effect to fetch notifications and set up socket listeners for new notifications
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

            // Cleanup the socket listener on component unmount
            return () => {
                socket.off('new_notification');
            };
        }
    }, [currentUser, setNotificationCount]);

    // Function to handle when a new post is created
    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]); // Add the new post to the start of the posts array
        setSuccessMessage('Your post has been successfully created!') // Send success message when post is created

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <Router>
            <NavBar onPostCreated={handlePostCreated} successMessage={successMessage} />
            <Routes>
                <Route path="/" element={<Home posts={posts} />} /> 
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/profile/:username" element={<ProtectedRoute element={<OtherProfile />} />} />
                <Route path="/my-profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/posts/:id/edit" element={<EditPostModal />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/trails" element={<Trails />} />
                <Route path="/forest/:id" element={<Forest />} />
                <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
                <Route path="/details/:type/:id" element={<Details />} />
                <Route path="/saved" element={<ProtectedRoute element={<Saved />} />} />
            </Routes>
        </Router>
    );
}

export default App;
