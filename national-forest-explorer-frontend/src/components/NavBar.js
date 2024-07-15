import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewPostModal from './NewPostModal';
import '../css/NavBar.css';
import Logo from '../assets/logo_transparent.png';
import axios from '../services/axiosConfig';

const NavBar = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setCurrentUser(response.data.user);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
        }
    }, [setCurrentUser]);

    const handleProfileClick = () => {
        navigate(`/profile/${currentUser.username}`);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <nav>
            <div className="nav-logo">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="logo-image" />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/explore">Explore</Link>
                {currentUser && (
                    <>
                        <Link to="/itineraries">My Trips</Link>
                        <button onClick={() => setModalOpen(true)}>New Post</button>
                    </>
                )}
            </div>
            <div className="nav-user">
                {currentUser ? (
                    <div className="dropdown" ref={dropdownRef}>
                        <img
                            src={currentUser.profilePicture}
                            alt="Profile"
                            className="profile-picture"
                            onClick={toggleDropdown}
                        />
                        <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
                            <button onClick={handleProfileClick}>{currentUser.username}</button>
                            <Link to="/notifications">Notifications</Link>
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