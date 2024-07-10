import React, { useState } from "react";
import { createPortal } from 'react-dom';
import axios from '../services/axiosConfig';

const NewPostModal = ({ isOpen, onClose }) => {
    const [postType, setPostType] = useState('photo');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [photos, setPhotos] = useState([]);

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
            for (const photo of photos) {
                formData.append('photos', photo);
            }
            await axios.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose();
        } catch (error) {
            console.error("Failed to create a post", error);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
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
                                        {index < rating ? '*' : '☆'}
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
                        Photos:
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setPhotos([...photos, ...e.target.files])}
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
