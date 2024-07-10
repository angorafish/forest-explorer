import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewPostModal from './NewPostModal';

const NavBar = ({ currentUser, logout }) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav>
            <div className="nav-logo">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-links">
                <Link to="/explore">Explore</Link>
                <Link to="/itineraries">My Trips</Link>
                <button onClick={() => setModalOpen(true)}>New Post</button>
            </div>
            <div className="nav-user">
                {currentUser ? (
                    <div className="dropdown">
                        <button className="dropbtn">{currentUser.username}</button>
                        <div className="dropdown-content">
                            <Link to="/profile">My Profile</Link>
                            <Link to="/saved">Saved</Link>
                            <Link to="/settings">Settings</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login">Login/Signup</Link>
                )}
            </div>
            <NewPostModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </nav>
    );
};

export default NavBar;