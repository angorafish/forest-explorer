import React, { useState } from 'react';
import axios from '../../services/axiosConfig';
import './posts.css';

// Modal component to edit a post
const EditPostModal = ({ post, onClose }) => {
    // State variables for form inputs
    const [location, setLocation] = useState(post.location);
    const [rating, setRating] = useState(post.rating);
    const [reviewText, setReviewText] = useState(post.reviewText);
    const [photo, setPhoto] = useState(null);

    // Handle form submission to update a post
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('location', location);
        formData.append('rating', rating);
        formData.append('reviewText', reviewText);
        if (photo) {
            formData.append('photo', photo);
        }
        try {
            await axios.put(`/posts/${post.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Failed to update post', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </label>
                    {post.postType === 'review' && (
                        <>
                            <label>
                                Rating:
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    min="0"
                                    max="5"
                                />
                            </label>
                            <label>
                                Review Text:
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </label>
                        </>
                    )}
                    <label>
                        Photo:
                        <input
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;