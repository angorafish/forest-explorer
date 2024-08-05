import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import './posts.css';

// Using state to manage list of posts, loading status, and errors
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts');
                console.error('Fetched Posts:', response.data);
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                setError("Failed to fetch posts.");
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Recent Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.location}</h2>
                        <p>{post.reviewText}</p>
                        <p>Rating: {post.rating}</p>
                        {post.photos && post.photos.map(photo => (
                            <img key={photo.id} src={`${process.env.REACT_APP_API_URL}${photo.url}`} alt="Post" />
                        ))}
                        <p>Posted by: <Link to={`/profile/${post.user.username}`}>{post.user.username}</Link></p>
                        <Link to={`/post/${post.id}`}>View Post</Link>
                    </li>
                ))}
            </ul>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default Posts;