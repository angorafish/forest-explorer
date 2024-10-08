import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewPostModal from '../posts/NewPostModal';
import './navBar.css';
import Logo from '../../assets/logo_transparent.png';
import axios from '../../services/axiosConfig';
import socket from '../../services/socketConfig';
import { useAuth } from '../authentication/AuthContext';

// Display navbar component
const NavBar = ({ onPostCreated, successMessage }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, notificationCount, setNotificationCount } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false); // Using state to manage modal visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Using state to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref to handle clicks outside the dropdown

  // Verify token and fetch current user
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

  // Fetch notifications and set up socket listeners
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

  // Toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add and remove event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle log out, log user out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

  // Content for the profile picture or account button
  const profileContent = currentUser && currentUser.profilePhoto ? (
    <img
      src={`${process.env.REACT_APP_API_URL}/uploads/${currentUser.profilePhoto}`}
      alt="Profile"
      className="profile-picture"
      onClick={toggleDropdown}
    />
  ) : (
    <button className="account-button" onClick={toggleDropdown}>Account</button>
  );

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
                    <Link to="/saved">Saved</Link>
                    <button className="new-post-button" onClick={() => setModalOpen(true)}>New Post</button>
                </>
            )}
        </div>
        <div className="nav-user">
            {currentUser ? (
                <div className="dropdown" ref={dropdownRef}>
                    {profileContent}
                    <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
                        <Link to={`/profile/${currentUser.username}`}>{currentUser.username}</Link>
                        <Link to="/notifications">Notifications {notificationCount > 0 && `(${notificationCount})`}</Link> 
                        <Link to="/settings">Settings</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            ) : (
                <Link to="/login" className="login-signup-button">Login/Signup</Link>
            )}
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <NewPostModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onPostCreated={onPostCreated} />
    </nav>
  );
};

export default NavBar;