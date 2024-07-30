import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewPostModal from '../posts/NewPostModal';
import './navBar.css';
import Logo from '../../assets/logo_transparent.png';
import axios from '../../services/axiosConfig';
import socket from '../../services/socketConfig';
import { useAuth } from '../authentication/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, notificationCount, setNotificationCount } = useAuth();
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

  const profileContent = currentUser && currentUser.profilePhoto ? (
    <img
      src={`http://localhost:3000/uploads/${currentUser.profilePhoto}`}
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
            <button onClick={() => setModalOpen(true)}>New Post</button>
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
          <Link to="/login">Login/Signup</Link>
        )}
      </div>
      <NewPostModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
};

export default NavBar;