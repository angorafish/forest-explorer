import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import './profile.css';

// Component to display another user's profile
const OtherProfile = () => {
    // Access the current user from the authentication context
    const { currentUser } = useAuth();
    // Extract the username parameter from the URL
    const { username } = useParams();
    // Hook for navigation
    const navigate = useNavigate();
    // State to store user data, posts, and errors
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch user data and posts when the component mounts or the username changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data from the API
                const response = await axios.get(`/users/profile/${username}`);
                // Set the user and posts state with the response data
                setUser(response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data');
            }
        };
        fetchUserData();
    }, [username]);

    // Display an error message if there's an error
    if (error) {
        return <div>{error}</div>;
    }

    // Display a loading message while fetching data
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            {/* Cover Photo */}
            <div className="cover-photo">
                <img src={`http://localhost:3000/uploads/${user.coverPhoto}`} alt="Cover" />
            </div>
            {/* Profile Details */}
            <div className="profile-details">
                <div className="profile-photo">
                    <img src={`http://localhost:3000/uploads/${user.profilePhoto}`} alt="Profile" />
                </div>
                <h2>{user.username}</h2>
                <p>Member since {new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                {/* User's Posts */}
                <div className="user-posts">
                    <h3>Recent Posts</h3>
                    <div className="posts-grid">
                        {posts.map(post => (
                            <div key={post.id} className="post" onClick={() => navigate(`/posts/${post.id}`)}>
                                <p>{post.reviewText}</p>
                                <p>{post.location}</p>
                                {post.photos && post.photos.map((photo, index) => (
                                    <img key={index} src={`http://localhost:3000${photo.url}`} alt="Post" className="post-picture" />
                                ))}
                                <p>Likes: {post.likes.length}</p>
                                {/* Comments */}
                                <div className="post-comments">
                                    <h4>Comments</h4>
                                    <ul>
                                        {post.comments.map(comment => (
                                            <li key={comment.id}>
                                                <span onClick={() => navigate(`/profile/${comment.user.username}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                                    {comment.user.username}
                                                </span>: {comment.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <textarea placeholder="Add a comment"></textarea>
                                    <button>Comment</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherProfile;