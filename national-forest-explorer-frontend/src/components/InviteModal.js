import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from '../services/axiosConfig';

const InviteModal = ({ isOpen, onClose, itinerary }) => {
    const [email, setEmail] = useState('');

    const handleInvite = async () => {
        try {
            await axios.post(`/api/itineraries/${itinerary.id}/invite`, { email });
            onClose();
        } catch (error) {
            console.error('Failed to send invitation:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Invite to {itinerary ? itinerary.name : 'Itinerary'}</h2>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleInvite}>Send Invitation</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
};

export default InviteModal;