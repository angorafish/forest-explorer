import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { useAuth } from '../AuthContext';
import socket from '../services/socketConfig';
import FriendRequests from './FriendRequests';
import '../css/Notification.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { currentUser } = useAuth();

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/notifications');
            console.log('Fetched notifications:', response.data);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();

        socket.on('new_notification', (notification) => {
            console.log('New notification received:', notification);
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        });

        return () => {
            socket.off('new_notification');
        };
    }, []);

    const handleReadNotification = async (id) => {
        try {
            console.log('Marking notification as read:', id);
            const response = await axios.put(`/notifications/${id}/read`);
            console.log('Response from marking as read:', response.data);

            setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
            fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleFriendRequest = async (id, accept) => {
        try {
            await axios.put(`/friend-requests/${id}/${accept ? 'accept' : 'reject'}`);
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            console.error('Error handling friend request:', error);
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
                        <li key={notification.id} className={notification.status === 'unread' ? 'unread' : ''}>
                            {notification.type === 'like' && (
                                <p>
                                    <strong>{notification.fromUser?.username}</strong> liked your post
                                </p>
                            )}
                            {notification.type === 'comment' && (
                                <p>
                                    <strong>{notification.fromUser?.username}</strong> commented on your post
                                </p>
                            )}
                            {notification.type === 'friend_request' && (
                                <FriendRequests 
                                    notification={notification} 
                                    handleFriendRequest={handleFriendRequest} 
                                />
                            )}
                            {notification.type === 'friend_accept' && (
                                <p>
                                    <strong>{notification.fromUser?.username}</strong> accepted your friend request
                                </p>
                            )}
                            <button className="close-button" onClick={() => handleReadNotification(notification.id)}>X</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;