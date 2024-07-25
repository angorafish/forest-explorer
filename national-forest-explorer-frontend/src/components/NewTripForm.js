import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Modal from 'react-modal';
import '../css/NewTripForm.css';

Modal.setAppElement('#root');

const NewTripForm = ({ isOpen, onClose, trip }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [forest, setForest] = useState('');
    const [itineraryItems, setItineraryItems] = useState([]);
    const [email, setEmail] = useState('');
    const [newItem, setNewItem] = useState({ date: '', time: '', note: '', forestId: '', trailId: '', campsiteId: '' });
    const [forestOptions, setForestOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (trip) {
            setName(trip.name);
            setStartDate(trip.startDate ? moment(trip.startDate) : null);
            setEndDate(trip.endDate ? moment(trip.endDate) : null);
            setDescription(trip.description);
            setForest(trip.forest);
            setItineraryItems(trip.items || []);
        } else {
            setName('');
            setStartDate(null);
            setEndDate(null);
            setDescription('');
            setForest('');
            setItineraryItems([]);
        }
    }, [trip]);

    useEffect(() => {
        const fetchForests = async () => {
            try {
                const response = await axios.get('/forests');
                setForestOptions(response.data);
            } catch (error) {
                console.error('Failed to fetch forests:', error);
            }
        };

        fetchForests();
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            if (forest) {
                try {
                    const response = await axios.get(`/forests/${forest}/locations`);
                    setLocationOptions(response.data);
                } catch (error) {
                    console.error('Failed to fetch locations:', error);
                }
            }
        };

        fetchLocations();
    }, [forest]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (trip) {
                response = await axios.put(`/itineraries/${trip.id}`, { name, startDate, endDate, description, forest });
            } else {
                response = await axios.post('/itineraries', { name, startDate, endDate, description, forest });
            }
            if (email) {
                await axios.post(`/itineraries/${response.data.id}/invite`, { email });
            }
            for (const item of itineraryItems) {
                if (item.id) {
                    await axios.put(`/itineraryitems/${item.id}`, item);
                } else {
                    await axios.post('/itineraryitems', { ...item, itineraryId: response.data.id });
                }
            }
            onClose();
            navigate(`/trip-details/${response.data.id}`);
        } catch (error) {
            console.error('Failed to save trip:', error);
        }
    };

    const addNewItem = () => {
        setItineraryItems([...itineraryItems, { ...newItem }]);
        setNewItem({ date: '', time: '', note: '', forestId: '', trailId: '', campsiteId: '' });
    };

    const handleItemChange = (index, field, value) => {
        const items = [...itineraryItems];
        items[index] = { ...items[index], [field]: value };
        setItineraryItems(items);
    };

    if (!isOpen) return null;

    return createPortal(
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>Close</button>
                    <form onSubmit={handleSave}>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label>Start and End Dates</label>
                        <DateRangePicker
                            startDate={startDate} 
                            startDateId="start_date_id" 
                            endDate={endDate} 
                            endDateId="end_date_id" 
                            onDatesChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate); }}
                            focusedInput={focusedInput} 
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)} 
                            required
                        />
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <label>Forest</label>
                        <select value={forest} onChange={(e) => setForest(e.target.value)} required>
                            <option value="">Select a forest</option>
                            {forestOptions.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                        <label>Invite Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <h3>Itinerary Items</h3>
                        {itineraryItems.map((item, index) => (
                            <div key={index}>
                                <label>Date</label>
                                <input type="date" value={item.date} onChange={(e) => handleItemChange(index, 'date', e.target.value)} required />
                                <label>Time</label>
                                <input type="time" value={item.time} onChange={(e) => handleItemChange(index, 'time', e.target.value)} />
                                <label>Note</label>
                                <input type="text" value={item.note} onChange={(e) => handleItemChange(index, 'note', e.target.value)} />
                                <label>Location</label>
                                <select value={item.location} onChange={(e) => handleItemChange(index, 'location', e.target.value)} required>
                                    <option value="">Select a location</option>
                                    {locationOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <button type="button" onClick={addNewItem}>Add Item</button>
                        <button type="submit">{trip ? 'Save Changes' : 'Create'}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>,
        document.body
    );
};

export default NewTripForm;