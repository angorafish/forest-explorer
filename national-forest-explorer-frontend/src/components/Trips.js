import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NewTripForm from './NewTripForm.js';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/Trips.css';

const localizer = momentLocalizer(moment);

const Trips = () => {
    const [itineraries, setItineraries] = useState([]);
    const [isNewTripModalOpen, setNewTripModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get('/itineraries');
                console.log('Fetched itineraries:', response.data);
                setItineraries(response.data);
            } catch (error) {
                console.error('Failed to fetch itineraries:', error);
            }
        };

        fetchItineraries();
    }, []);

    const handleSelectEvent = (event) => {
        const itinerary = itineraries.find(i => i.name === event.title && new Date(i.startDate).getTime() === new Date(event.start).getTime());
        if (itinerary) {
            navigate(`/trip-details/${itinerary.id}`);
        }
    };

    const handleNewTrip = () => {
        setNewTripModalOpen(true);
    };

    return (
        <div>
            <h1>My Trips</h1>
            <button onClick={handleNewTrip}>Create New Trip</button>
            <Calendar
                localizer={localizer}
                events={itineraries.map(itinerary => ({
                    title: itinerary.name,
                    start: new Date(itinerary.startDate),
                    end: new Date(itinerary.endDate),
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
            />
            <div>
                <h2>Upcoming Itineraries</h2>
                {itineraries.filter(itinerary => new Date(itinerary.startDate) >= new Date()).map(itinerary => (
                    <div key={itinerary.id} onClick={() => navigate(`/trip-details/${itinerary.id}`)}>
                        <h3>{itinerary.name}</h3>
                        <p>{itinerary.startDate} - {itinerary.endDate}</p>
                        <p>{itinerary.forest}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>Previous Itineraries</h2>
                {itineraries.filter(itinerary => new Date(itinerary.startDate) < new Date()).map(itinerary => (
                    <div 
                        key={itinerary.id} 
                        onClick={() => navigate(`/trip-details/${itinerary.id}`)}
                        style={{ color: 'gray' }}
                    >
                        <h3>{itinerary.name}</h3>
                        <p>{itinerary.startDate} - {itinerary.endDate}</p>
                        <p>{itinerary.forest}</p>
                    </div>
                ))}
            </div>
            <Modal isOpen={isNewTripModalOpen} onRequestClose={() => setNewTripModalOpen(false)}>
                <NewTripForm isOpen={isNewTripModalOpen} onClose={() => setNewTripModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Trips;