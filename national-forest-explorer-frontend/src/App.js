import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup';
import Profile from './components/Profile';
import Posts from './components/Posts';
import ProtectedRoute from './components/ProtectedRoute';
import Map from './components/Map';
import Search from './components/Search';
import Settings from './components/Settings';
import Trips from './components/Trips';
import PostDetails from './components/PostDetails';
import Explore from './components/Explore';
import Itineraries from './components/Itineraries';
import Trails from './components/Trails';
import Campsites from './components/Campsites';
import axios from './services/axiosConfig';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setCurrentUser(response.data);
            }).catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <Router>
            <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} logout={logout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignup setCurrentUser={setCurrentUser} />} />
                <Route path="/profile" element={<ProtectedRoute currentUser={currentUser} element={<Profile />} />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/map" element={<Map />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<ProtectedRoute currentUser={currentUser} element={<Settings />} />} />
                <Route path="/trips" element={<ProtectedRoute currentUser={currentUser} element={<Trips />} />} />
                <Route path="/itineraries" element={<ProtectedRoute currentUser={currentUser} element={<Itineraries />} />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/trails" element={<Trails />} />
                <Route path="/campsites" element={<Campsites />} />
            </Routes>
        </Router>
    );
}

export default App;