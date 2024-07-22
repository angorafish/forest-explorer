import React, { useEffect, useState } from "react";
import axios from "../services/axiosConfig";
import { Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
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
            <div className="photo-grid">
                {posts.map(post => (
                    <div key={post.id} className="photo-card">
                        <Link to={`/posts/${post.id}`}>
                            {post.photos && post.photos.length > 0 && (
                                <img src={`/uploads/${post.photos[0].url}`} alt={post.location} />
                            )}
                            <p>{post.location}</p>
                        </Link>
                        <div className="photo-info">
                            <p>Posted by {post.user ? post.user.username : 'Unknown'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;