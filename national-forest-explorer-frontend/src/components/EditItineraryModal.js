import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from '../services/axiosConfig';

const EditItineraryModal = ({ isOpen, onClose, itinerary }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (itinerary) {
            setName(itinerary.name);
            setStartDate(itinerary.startDate);
            setEndDate(itinerary.endDate);
            setDescription(itinerary.description);
        } else {
            setName('');
            setStartDate('');
            setEndDate('');
            setDescription('');
        }
    }, [itinerary]);

    const handleSave = async () => {
        try {
            if (itinerary) {
                await axios.put(`/itineraries/${itinerary.id}`, { name, startDate, endDate, description });
            } else {
                await axios.post('/itineraries', { name, startDate, endDate, description });
            }
            onClose();
        } catch (error) {
            console.error('Failed to save itinerary:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>{itinerary ? 'Edit Itinerary' : 'Create New Trip'}</h2>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSave}>{itinerary ? 'Save' : 'Create'}</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
};

export default EditItineraryModal;