import React, { useEffect, useState } from "react";
import axios from "../../services/axiosConfig";
import { Link } from "react-router-dom";
import "./home.css";

// Home component responsible for displaying recent posts
const Home = () => {
    // State to store posts
    const [posts, setPosts] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to manage error messages
    const [error, setError] = useState(null);

    // Function to fetch posts from the API
    const fetchPosts = async () => {
        try {
            // Make a GET request to fetch posts
            const response = await axios.get('/posts');
            console.log('Fetched Posts:', response.data);
            // Update posts state with the fetched data
            setPosts(response.data);
            // Set loading to false after fetching posts
            setLoading(false);
        } catch (error) {
            // Set error message if fetching posts fails
            setError("Failed to fetch posts.");
            setLoading(false);
        }
    };

    // useEffect hook to fetch posts when the component mounts
    useEffect(() => {
        fetchPosts();
    }, []);

    // Function to get the correct photo URL
    const getPhotoUrl = (url) => {
        if (url.startsWith('../uploads/')) {
            return url.replace('../uploads/', '/uploads/');
        }
        return url.startsWith('/uploads/') ? url : `/uploads/${url}`;
    };    

    // Render loading state
    if (loading) return <div>Loading...</div>;
    // Render error state
    if (error) return <div>{error}</div>;

    // Render the list of posts
    return (
        <div>
            <h1>Recent Posts</h1>
            <div className="photo-grid">
                {posts.map(post => (
                    <div key={post.id} className="photo-card">
                        <Link to={`/posts/${post.id}`}>
                            {post.photos && post.photos.length > 0 ? (
                                <img src={`${process.env.REACT_APP_API_URL}${getPhotoUrl(post.photos[0].url)}`} alt={post.location} />
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