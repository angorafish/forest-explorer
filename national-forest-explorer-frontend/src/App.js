import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Itineraries from './components/Itineraries';
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

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <NavBar currentUser={currentUser} />
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

            </Routes>
        </Router>
    );
}

export default App;
