import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import Comment from './Comment';
import './posts.css';
import EditPostModal from './EditPostModal';
import { useAuth } from '../authentication/AuthContext';
import { FaEllipsisV, FaArrowLeft } from 'react-icons/fa';

// Using state to manage the features
const PostDetails = () => {
    const { id } = useParams(); // Get the post ID from URL parameters
    const { currentUser } = useAuth(); // Get the current user from context
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [likedByUser, setLikedByUser] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Fetch post details and related likes/comments
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                setPost(response.data);
                setComments(response.data.comments || []);
                setLikes(response.data.likes.length || 0);
                setLikedByUser(response.data.likes.some(like => like.userId === currentUser?.id));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch post.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, currentUser]);

    // Handle new comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/comments', {
                postId: id,
                text: newComment,
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Failed to submit comment', error);
            setError('Failed to submit comment.');
        }
    };

    // Handle liking and unliking the post
    const handleLike = async () => {
        if (likedByUser) {
            try {
                await axios.delete(`/likes/${id}`);
                setLikes(likes - 1);
                setLikedByUser(false);
            } catch (error) {
                console.error('Failed to unlike post', error);
                setError('Failed to unlike post.');
            }
        } else {
            try {
                await axios.post(`/likes/${id}`);
                setLikes(likes + 1);
                setLikedByUser(true);
            } catch (error) {
                console.error('Failed to like post', error);
                setError('Failed to like post.');
            }
        }
    };

    // Handle post deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`/posts/${id}`);
                navigate('/');
            } catch (error) {
                console.error('Failed to delete post', error);
                setError('Failed to delete post.');
            }
        }
    };

    // Handle editing the post
    const handleEdit = () => {
        setShowModal(true);
    };

    useEffect(() => {
        console.log("showModal:", showModal);
    }, [showModal]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Helper function to get the photo URL
    const getPhotoUrl = (url) => {
        if (url.startsWith('../uploads/')) {
            return url.replace('../uploads/', '/uploads/');
        }
        return url.startsWith('/uploads/') ? url : `/uploads/${url}`;
    };

    return (
        <div className="post-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back
            </button>
            <h1 className="post-title">{post.location}</h1>
            <div className="post-images">
                {post.photos && post.photos.length > 0 && (
                    <img src={`http://localhost:3000${getPhotoUrl(post.photos[0].url)}`} alt={post.location} className="post-image" />
                )}
            </div>
            <p className="post-author">Posted by <Link to={`/profile/${post.user.username}`}>{post.user.username}</Link></p>
            {post.rating > 0 && (
                <div className="stars">
                    {'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)}
                </div>
            )}
            <p className="post-review-text">{post.reviewText}</p>
            <p>{likes} Likes</p>
            {currentUser && (
                <button onClick={handleLike}>
                    {likedByUser ? 'Unlike' : 'Like'}
                </button>
            )}
            {currentUser && post.userId === currentUser.id && (
                <div className="post-actions">
                    <button className="action-button" onClick={() => setShowDropdown(!showDropdown)}>
                        <FaEllipsisV />
                    </button>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={handleDelete}>Delete</button>
                            <button className="dropdown-item" onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
            )}
            <div className="post-reviews">
                {post.reviews && post.reviews.map((review) => (
                    <div key={review.id} className="review">
                        <div className="stars">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
            <div className="post-comments">
                <h2>Comments</h2>
                {comments && comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                {currentUser && (
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <label>
                            Comment:
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="comment-textarea"
                            ></textarea>
                        </label>
                        <button type="submit" className="comment-submit-button">Submit Comment</button>
                    </form>
                )}
            </div>
            {showModal && (
                <EditPostModal post={post} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default PostDetails;