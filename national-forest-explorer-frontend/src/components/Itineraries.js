import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EditItineraryModal from './EditItineraryModal';
import InviteModal from './InviteModal';

const localizer = momentLocalizer(moment);

const Trips = () => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get('/api/itineraries');
                setItineraries(response.data);
            } catch (error) {
                console.error('Failed to fetch itineraries:', error);
            }
        };

        fetchItineraries();
    }, []);

    const handleSelectEvent = (itinerary) => {
        setSelectedItinerary(itinerary);
    };

    const handleEdit = (itinerary) => {
        setSelectedItinerary(itinerary);
        setEditModalOpen(true);
    };

    const handleInvite = (itinerary) => {
        setSelectedItinerary(itinerary);
        setInviteModalOpen(true);
    };

    const handleDelete = async (itineraryId) => {
        try {
            await axios.delete(`/api/itineraries/${itineraryId}`);
            setItineraries(itineraries.filter(itinerary => itinerary.id !== itineraryId));
        } catch (error) {
            console.error('Failed to delete itinerary:', error);
        }
    };

    return (
        <div>
            <h1>My Trips</h1>
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
                    <div key={itinerary.id}>
                        <h3>{itinerary.name}</h3>
                        <p>{itinerary.startDate} - {itinerary.endDate}</p>
                        <button onClick={() => handleEdit(itinerary)}>Edit</button>
                        <button onClick={() => handleInvite(itinerary)}>Invite</button>
                        <button onClick={() => handleDelete(itinerary.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Previous Itineraries</h2>
                {itineraries.filter(itinerary => new Date(itinerary.startDate) < new Date()).map(itinerary => (
                    <div key={itinerary.id}>
                        <h3>{itinerary.name}</h3>
                        <p>{itinerary.startDate} - {itinerary.endDate}</p>
                    </div>
                ))}
            </div>
            <EditItineraryModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                itinerary={selectedItinerary}
            />
            <InviteModal
                isOpen={isInviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
                itinerary={selectedItinerary}
            />
        </div>
    );
};

export default Trips;