import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from '../services/axiosConfig';

const EditItineraryModal = ({ isOpen, onClose, itinerary }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (itinerary) {
            setName(itinerary.name);
            setStartDate(itinerary.startDate);
            setEndDate(itinerary.endDate);
        }
    }, [itinerary]);

    const handleSave = async () => {
        try {
            await axios.put(`/itineraries/${itinerary.id}`, { name, startDate, endDate });
            onClose();
        } catch (error) {
            console.error('Failed to update itinerary:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Edit Itinerary</h2>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
};

export default EditItineraryModal;