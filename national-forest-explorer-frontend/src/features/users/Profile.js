import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import EditPostModal from '../posts/EditPostModal';
import './profile.css';

// Component to display and edit the current user's profile
const Profile = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newProfilePhoto, setNewProfilePhoto] = useState(null);
    const [newCoverPhoto, setNewCoverPhoto] = useState(null);
    const [postOptionsVisible, setPostOptionsVisible] = useState({});
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        if (currentUser?.username) {
            axios.get(`/users/profile/${currentUser.username}`).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });

            axios.get(`/users/user/${currentUser.username}`).then(response => {
                setPosts(response.data);
            }).catch(error => {
                console.error('Error fetching user posts:', error);
            });
        }
    }, [currentUser]);

    const getPhotoUrl = (url) => {
        if (url.startsWith('../uploads/')) {
            return url.replace('../uploads/', '/uploads/');
        }
        return url.startsWith('/uploads/') ? url : `/uploads/${url}`;
    };

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleProfilePhotoChange = (event) => {
        setNewProfilePhoto(event.target.files[0]);
    };

    const handleCoverPhotoChange = (event) => {
        setNewCoverPhoto(event.target.files[0]);
    };

    const handleSaveChanges = () => {
        const formData = new FormData();
        if (newProfilePhoto) formData.append('profilePhoto', newProfilePhoto);
        if (newCoverPhoto) formData.append('coverPhoto', newCoverPhoto);

        axios.put(`/users/${currentUser.username}/photos`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            setUser(response.data);
            setEditMode(false);
        }).catch(error => {
            console.error('Error saving photos:', error);
            alert('Failed to save photos. Please ensure you are uploading images only.');
        });
    };

    const togglePostOptions = (postId) => {
        setPostOptionsVisible(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleEditPost = (postId) => {
        const post = posts.find(p => p.id === postId);
        setEditingPost(post);
        setPostOptionsVisible({}); // Close all dropdowns
    };

    const handleCloseEditModal = () => {
        setEditingPost(null);
    };

    const handleDeletePost = (postId) => {
        axios.delete(`/posts/${postId}`).then(() => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        }).catch(error => {
            console.error('Error deleting post:', error);
        });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

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
                                    <p>Likes: {post.likes.length}</p>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {editingPost && (
                <div className="modal-overlay">
                    <EditPostModal post={editingPost} onClose={handleCloseEditModal} />
                </div>
            )}
        </div>
    );
};

export default Profile;