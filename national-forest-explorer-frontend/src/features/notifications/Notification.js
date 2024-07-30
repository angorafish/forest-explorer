import React, { useState, useEffect } from 'react';
import axios from '../../services/axiosConfig';
import socket from '../../services/socketConfig';
import { Link } from 'react-router-dom';
import './notification.css';
import { useAuth } from '../authentication/AuthContext';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { setNotificationCount } = useAuth();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications');
                setNotifications(response.data);
                setNotificationCount(response.data.filter(notification => notification.status === 'unread').length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        socket.on('new_notification', (notification) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
            setNotificationCount(prevCount => prevCount + 1);
        });

        return () => {
            socket.off('new_notification');
        };
    }, [setNotificationCount]);

    const handleReadNotification = async (id) => {
        try {
            await axios.put(`/notifications/${id}/read`);
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