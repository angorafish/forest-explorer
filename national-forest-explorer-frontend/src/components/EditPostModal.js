import React, { useState } from 'react';
import '../css/EditPostModal.css';

const EditPostModal = ({ show, onClose, post, onSave }) => {
    const [location, setLocation] = useState(post.location);
    const [rating, setRating] = useState(post.rating);
    const [reviewText, setReviewText] = useState(post.reviewText);
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            location,
            rating,
            reviewText,
            photo
        };
        onSave(updatedPost);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <label>
                        Location/Title:
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </label>
                    {post.postType === 'review' && (
                        <>
                            <label>
                                Rating:
                                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
                            </label>
                            <label>
                                Review Text:
                                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                            </label>
                        </>
                    )}
                    <label>
                        Replace Photo:
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;