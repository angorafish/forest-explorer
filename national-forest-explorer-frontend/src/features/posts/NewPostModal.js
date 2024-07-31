import React, { useState } from "react";
import { createPortal } from 'react-dom';
import axios from '../../services/axiosConfig';
import './posts.css';

// Modal component to create a new post
const NewPostModal = ({ isOpen, onClose }) => {
    const [postType, setPostType] = useState('photo'); // State for post type
    const [location, setLocation] = useState(''); // State for location input
    const [locationId, setLocationId] = useState(null); // State for selected location ID
    const [rating, setRating] = useState(0); // State for rating input
    const [reviewText, setReviewText] = useState(''); // State for review text input
    const [photo, setPhoto] = useState(null); // State for photo input
    const [suggestions, setSuggestions] = useState([]); // State for location suggestions

    // Fetch suggestions based on user input
    const handleLocationChange = async (e) => {
        const value = e.target.value;
        setLocation(value);
        if (value) {
            try {
                const response = await axios.get(`/search/suggestions?q=${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Failed to fetch suggestions', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion.name);
        setLocationId(suggestion.id);
        setSuggestions([]);
    };

    // Reset form inputs
    const resetForm = () => {
        setPostType('photo');
        setLocation('');
        setLocationId(null);
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
            formData.append('locationId', locationId);
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
                            onChange={handleLocationChange}
                            required
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-dropdown">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.name} - {suggestion.type}
                                    </li>
                                ))}
                            </ul>
                        )}
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