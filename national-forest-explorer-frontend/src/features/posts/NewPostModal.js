import React, { useState } from "react";
import { createPortal } from 'react-dom';
import axios from '../../services/axiosConfig';
import './posts.css';

// Modal component to create a new post
const NewPostModal = ({ isOpen, onClose }) => {
    // State variables for form inputs
    const [postType, setPostType] = useState('photo');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [photo, setPhoto] = useState(null);

    // Reset form inputs
    const resetForm = () => {
        setPostType('photo');
        setLocation('');
        setRating(0);
        setReviewText('');
        setPhoto(null);
    };

    // Handle form submission to create a new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('postType', postType);
            formData.append('location', location);
            if (postType === 'review') {
                formData.append('rating', rating);
                formData.append('reviewText', reviewText);
            }
            if (photo) {
                formData.append('photo', photo);
            }
            await axios.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose(); // Close the modal on success
            resetForm(); // Reset form
        } catch (error) {
            console.error("Failed to create a post", error);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={() => { onClose(); resetForm(); }} className="modal-close-button">×</button>
                <form onSubmit={handleSubmit}>
                    <label>
                        Post Type:
                        <select value={postType} onChange={(e) => setPostType(e.target.value)}>
                            <option value="photo">Photo</option>
                            <option value="review">Review</option>
                        </select>
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </label>
                    {postType === 'review' && (
                        <>
                            <label>
                                Rating:
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} onClick={() => setRating(index + 1)}>
                                        {index < rating ? '★' : '☆'}
                                    </span>
                                ))}
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default NewPostModal;