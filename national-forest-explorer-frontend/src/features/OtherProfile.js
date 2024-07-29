import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';
import { useAuth } from '../AuthContext';
import '../css/OtherProfile.css';

const OtherProfile = () => {
    const { currentUser } = useAuth();
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/profile/${username}`);
                setUser(response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data');
            }
        };
        fetchUserData();
    }, [username]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="cover-photo">
                <img src={`http://localhost:3000/uploads/${user.coverPhoto}`} alt="Cover" />
            </div>
            <div className="profile-details">
                <div className="profile-photo">
                    <img src={`http://localhost:3000/uploads/${user.profilePhoto}`} alt="Profile" />
                </div>
                <h2>{user.username}</h2>
                <p>Member since {new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
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