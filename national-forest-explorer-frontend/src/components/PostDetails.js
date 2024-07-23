import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Comment from './Comment';
import '../css/PostDetails.css';
import EditPostModal from './EditPostModal';
import { useAuth } from '../AuthContext';
import { FaEllipsisV } from 'react-icons/fa';

const PostDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
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
                const response = await axios.post(`/likes/${id}`);
                setLikes(likes + 1);
                setLikedByUser(true);
            } catch (error) {
                console.error('Failed to like post', error);
                setError('Failed to like post.');
            }
        }
    };

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="post-details">
            <h1 className="post-title">{post.location}</h1>
            <div className="post-images">
                {post.photos && post.photos.length > 0 && (
                    post.photos.map((photo, index) => (
                        <img key={index} src={`http://localhost:3000/uploads/${photo.url.split('/').pop()}`} alt={post.location} className="post-image" />
                    ))
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
            <button onClick={handleLike}>
                {likedByUser ? 'Unlike' : 'Like'}
            </button>
            <div className="post-actions">
                {currentUser && currentUser.id === post.user.id && (
                    <>
                        <button className="action-button" onClick={() => setShowDropdown(!showDropdown)}>
                            <FaEllipsisV />
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={handleDelete}>Delete</button>
                                <button className="dropdown-item" onClick={() => setShowModal(true)}>Edit</button>
                            </div>
                        )}
                    </>
                )}
            </div>
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
            </div>
            {showModal && (
                <EditPostModal post={post} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default PostDetails;