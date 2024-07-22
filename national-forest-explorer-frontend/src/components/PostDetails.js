import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Comment from './Comment';
import '../css/PostDetails.css';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                setPost(response.data);
                setComments(response.data.comments || []);
                setLikes(response.data.likes || 0);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch post.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

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
        try {
            const response = await axios.post(`/likes/${id}`);
            setLikes(likes + 1);
        } catch (error) {
            console.error('Failed to like post', error);
            setError('Failed to like post.');
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
                        <img key={index} src={`http://localhost:3000/${photo.url}`} alt={post.location} className="post-image" />
                    ))
                )}
            </div>
            <p className="post-author">Posted by {post.user.username}</p>
            {post.rating && <p className="post-rating">Rating: {post.rating} stars</p>}
            <p className="post-review-text">{post.reviewText}</p>
            <p>{likes} Likes</p>
            <button onClick={handleLike}>Like</button>
            <div className="post-reviews">
                {post.reviews && post.reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p>Rating: {review.rating} stars</p>
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
        </div>
    );
};

export default PostDetails;
