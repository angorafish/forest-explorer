import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import './profile.css';

// Display and edit the current user's profile
const Profile = () => {
    // Access the current user from the auth context
    const { currentUser } = useAuth();
    // Extract the username parameter from the URL
    const { username } = useParams();
    // Hook for navigation
    const navigate = useNavigate();
    // State to store user data, posts, and edit mode status
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newProfilePhoto, setNewProfilePhoto] = useState(null);
    const [newCoverPhoto, setNewCoverPhoto] = useState(null);
    const [postOptionsVisible, setPostOptionsVisible] = useState({});

    // Fetch user data and posts when the component mounts or the username changes
    useEffect(() => {
        axios.get(`/users/profile/${username}`).then(response => {
            setUser(response.data);
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });

        axios.get(`/users/user/${username}`).then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.error('Error fetching user posts:', error);
        });
    }, [username]);

    // Helper function to format photo URLs correctly
    const getPhotoUrl = (url) => {
        if (url.startsWith('../uploads/')) {
            return url.replace('../uploads/', '/uploads/');
        }
        return url.startsWith('/uploads/') ? url : `/uploads/${url}`;
    };

    // Handle navigation to post details page
    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    // Change profile photo logic
    const handleProfilePhotoChange = (event) => {
        setNewProfilePhoto(event.target.files[0]);
    };

    // Change cover photo logic
    const handleCoverPhotoChange = (event) => {
        setNewCoverPhoto(event.target.files[0]);
    };

    // Save changes to profile photos
    const handleSaveChanges = () => {
        const formData = new FormData();
        if (newProfilePhoto) formData.append('profilePhoto', newProfilePhoto);
        if (newCoverPhoto) formData.append('coverPhoto', newCoverPhoto);

        axios.put(`/users/${username}/photos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setUser(response.data);
            setEditMode(false);
        }).catch(error => {
            console.error('Error saving photos:', error);
            alert('Failed to save photos. Please ensure you are uploading images only.');
        });
    };

    // Toggle visibility of post options menu
    const togglePostOptions = (postId) => {
        setPostOptionsVisible(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    // Navigate to edit post page
    const handleEditPost = (postId) => {
        navigate(`/posts/${postId}/edit`);
    };

    // Delete post
    const handleDeletePost = (postId) => {
        axios.delete(`/posts/${postId}`).then(() => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        }).catch(error => {
            console.error('Error deleting post:', error);
        });
    };

    // Handle like click navigation
    const handleLikeClick = (username) => {
        navigate(`/profile/${username}`);
    };

    // Handle comment click navigation
    const handleCommentClick = (username) => {
        navigate(`/profile/${username}`);
    };

    // Display loading message while fetching data
    if (!user) {
        return <div>Loading...</div>;
    }

    // Check if current user is on their own
    const isCurrentUser = currentUser && currentUser.username === user.username;

    return (
        <div className="profile-page">
            <div className="cover-photo">
                {editMode ? (
                    <input type="file" onChange={handleCoverPhotoChange} />
                ) : (
                    user.coverPhoto && <img src={`http://localhost:3000/uploads/${user.coverPhoto}`} alt="Cover" />
                )}
            </div>
            <div className="profile-details">
                <div className="profile-photo">
                    {editMode ? (
                        <input type="file" onChange={handleProfilePhotoChange} />
                    ) : (
                        user.profilePhoto && <img src={`http://localhost:3000/uploads/${user.profilePhoto}`} alt="Profile" />
                    )}
                </div>
                <h2>{user.username}</h2>
                {isCurrentUser && (
                    <>
                        <button onClick={handleEditClick}>
                            {editMode ? 'Cancel' : 'Edit Profile'}
                        </button>
                        {editMode && (
                            <button onClick={handleSaveChanges}>
                                Save Changes
                            </button>
                        )}
                    </>
                )}
                <p>Member since {new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                <div className="user-posts">
                    <h3>Recent Posts</h3>
                    <div className="posts-grid">
                        {posts.map(post => (
                            <div key={post.id} className="post">
                                <div onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                                    {post.photos && post.photos.length > 0 && (
                                        <img src={`http://localhost:3000${getPhotoUrl(post.photos[0].url)}`} alt="Post" className="post-picture" />
                                    )}
                                    {post.rating > 0 && (
                                        <div className="stars">
                                            {'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)}
                                        </div>
                                    )}
                                    <p>{post.location}</p>
                                </div>
                                <div className="post-options">
                                    <button onClick={() => togglePostOptions(post.id)}>⋮</button>
                                    {postOptionsVisible[post.id] && (
                                        <div className="post-options-menu">
                                            <button onClick={() => handleEditPost(post.id)}>Edit</button>
                                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                                <div className="post-likes-comments">
                                    <p>
                                        Likes: {post.likes && post.likes.length > 0 ? post.likes.length : 0}
                                        {post.likes && post.likes.length > 0 && post.likes.map(like => (
                                            <span
                                                key={like.id}
                                                onClick={() => handleLikeClick(like.user.username)}
                                                style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
                                            >
                                                {like.user.username}
                                            </span>
                                        ))}
                                    </p>
                                    <ul>
                                        {post.comments && post.comments.length > 0 && post.comments.map(comment => (
                                            <li key={comment.id}>
                                                <span
                                                    onClick={() => handleCommentClick(comment.user.username)}
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {comment.user.username}
                                                </span>: {comment.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;