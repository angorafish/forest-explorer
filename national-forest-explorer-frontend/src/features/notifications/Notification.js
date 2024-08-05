import React, { useState, useEffect } from 'react';
import axios from '../../services/axiosConfig';
import socket from '../../services/socketConfig';
import { Link } from 'react-router-dom';
import './notification.css';
import { useAuth } from '../authentication/AuthContext';

// Logic to display user notifications
const Notifications = () => {
    // State to store notifications
    const [notifications, setNotifications] = useState([]);
    // Access the setNotificationCount function from the auth context
    const { setNotificationCount } = useAuth();

    // useEffect to fetch notifications and set up socket listeners
    useEffect(() => {
        // Function to fetch notifications from the server
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/notifications`);
                setNotifications(response.data);
                // Set the count of unread notifications
                setNotificationCount(response.data.filter(notification => notification.status === 'unread').length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        // Listen for new notifications via socket
        socket.on('new_notification', (notification) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
            setNotificationCount(prevCount => prevCount + 1);
        });

        // Cleanup the socket listener on component unmount
        return () => {
            socket.off('new_notification');
        };
    }, [setNotificationCount]);

    // Handle marking a notification as read
    const handleReadNotification = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/notifications/${id}/read`);
            // Update the notifications state to mark the notification as read
            setNotifications((prevNotifications) => prevNotifications.map(notification =>
                notification.id === id ? { ...notification, status: 'read' } : notification
            ));
            setNotificationCount(prevCount => prevCount - 1);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <ul className="notifications-list">
                    {notifications.map(notification => (
                        <li key={notification.id} className={notification.status === 'unread' ? 'unread' : 'read'}>
                            {notification.type === 'like' && notification.fromUser && (
                                <p>
                                    <Link to={`/profile/${notification.fromUser.username}`}>
                                        <strong>{notification.fromUser.username}</strong>
                                    </Link> liked your post
                                </p>
                            )}
                            {notification.type === 'comment' && notification.fromUser && (
                                <p>
                                    <Link to={`/profile/${notification.fromUser.username}`}>
                                        <strong>{notification.fromUser.username}</strong>
                                    </Link> commented on your post
                                </p>
                            )}
                            {notification.status === 'unread' && (
                                <button onClick={() => handleReadNotification(notification.id)}>
                                    Mark as read
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;