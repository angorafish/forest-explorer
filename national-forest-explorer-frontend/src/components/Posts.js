import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/axiosConfig';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts');
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
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
                            <img key={photo.id} src={`/${photo.url}`} alt="Post" />
                        ))}
                        <p>Posted by: {post.user.username}</p>
                        <Link to={`/post/${post.id}`}>View Post</Link>
                    </li>
                ))}
            </ul>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default Posts;