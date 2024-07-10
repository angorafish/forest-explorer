import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Comment from './Comment';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch post.');
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/comments/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error('Failed to fetch comments', error);
            }
        };

        fetchPost();
        fetchComments();
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
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{post.location}</h1>
            {post.photos && post.photos.length > 0 && (
                <img src={`http://localhost:3000/${post.photos[0]}`} alt={post.location} />
            )}
            <p>Posted by {post.User.username}</p>
            {post.rating && <p>Rating: {post.rating} stars</p>}
            <p>{post.reviewText}</p>
            {post.Reviews && post.Reviews.map((review) => (
                <div key={review.id} className="review">
                    <p>Rating: {review.rating} stars</p>
                    <p>{review.comment}</p>
                </div>
            ))}
            <div>
                <h2>Comments</h2>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                <form onSubmit={handleCommentSubmit}>
                    <label>
                        Comment:
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                    </label>
                    <button type="submit">Submit Comment</button>
                </form>
            </div>
        </div>
    );
};

export default PostDetails;
