import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import socket from '../services/socketConfig';

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        axios.get('/friend-requests')
            .then(response => {
                setFriendRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching friend requests:', error);
            });

        socket.on('new_notification', (notification) => {
            if (notification.type === 'friend_request') {
                setFriendRequests((prevRequests) => [...prevRequests, notification.friendRequest]);
            }
        });

        return () => {
            socket.off('new_notification');
        };
    }, []);

    const handleFriendRequest = async (id, accept) => {
        try {
            await axios.put(`/friend-requests/${id}/${accept ? 'accept' : 'reject'}`);
            setFriendRequests(friendRequests.filter(request => request.id !== id));
        } catch (error) {
            console.error('Error handling friend request:', error);
        }
    };

    return (
        <div>
            <h1>Friend Requests</h1>
            {friendRequests.length === 0 ? (
                <p>No friend requests</p>
            ) : (
                <ul>
                    {friendRequests.map(request => (
                        <li key={request.id}>
                            <strong>{request.requester.username}</strong> sent you a friend request
                            <button onClick={() => handleFriendRequest(request.id, true)}>Accept</button>
                            <button onClick={() => handleFriendRequest(request.id, false)}>Ignore</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendRequests;