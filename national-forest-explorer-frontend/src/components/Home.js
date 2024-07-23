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
                console.log('Fetched Posts:', response.data); // Log fetched posts
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

    const getPhotoUrl = (url) => {
        if (url.startsWith('../uploads/')) {
            return `/uploads/${url.replace('../uploads/', '')}`;
        }
        return `/uploads/${url}`;
    };

    return (
        <div>
            <h1>Recent Posts</h1>
            <div className="photo-grid">
                {posts.map(post => (
                    <div key={post.id} className="photo-card">
                        <Link to={`/posts/${post.id}`}>
                            {post.photos && post.photos.length > 0 ? (
                                <img src={getPhotoUrl(post.photos[0].url)} alt={post.location} />
                            ) : (
                                post.postType === 'review' && (
                                    <div className="review-info">
                                        {[...Array(5)].map((star, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <span key={index}>
                                                    {ratingValue <= post.rating ? (
                                                        <i className="fas fa-star" style={{ color: "#ffc107" }}></i>
                                                    ) : (
                                                        <i className="far fa-star" style={{ color: "#ffc107" }}></i>
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )
                            )}
                            <p>{post.location}</p>
                        </Link>
                        <div className="photo-info">
                            <p>Posted by <Link to={`/profile/${post.user.username}`}>{post.user.username}</Link></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;