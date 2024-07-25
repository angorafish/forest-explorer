import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Modal from 'react-modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import NewTripForm from './NewTripForm';
import { useAuth } from '../AuthContext';

const localizer = momentLocalizer(moment);

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await axios.get(`/itineraries/${id}`);
                setTrip(response.data);
            } catch (error) {
                console.error('Failed to fetch trip details:', error);
            }
        };

        fetchTrip();
    }, [id]);

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/itineraries/${id}`);
            navigate('/trips');
        } catch (error) {
            console.error('Failed to delete trip:', error);
        }
    };

    const handleLeave = async () => {
        try {
            await axios.post(`/itineraries/${id}/leave`, { userId: currentUser.id });
            setLeaveModalOpen(false);
            navigate('/trips');
        } catch (error) {
            console.error('Failed to leave trip:', error);
        }
    };

    if (!trip) {
        return <div>Loading...</div>;
    }

    const formattedStartDate = moment(trip.startDate).format('DD/MM/YYYY');
    const formattedEndDate = moment(trip.endDate).format('DD/MM/YYYY');

    const forestCoordinates = trip.forestCoordinates || [];

    const groupedItems = trip.items.reduce((acc, item) => {
        const date = moment(item.date).format('DD/MM/YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const handleLocationClick = (id, type) => {
        navigate(`/${type}-details/${id}`);
    };

    return (
        <div>
            <h1>{trip.name}</h1>
            <p>{trip.description}</p>
            <p>{formattedStartDate} - {formattedEndDate}</p>
            <p>Created by: {trip.creator.username}</p>
            <p>Invited Members: {trip.invitedMembers.map(member => member.username).join(', ')}</p>
            <Calendar
                localizer={localizer}
                events={[{
                    title: trip.name,
                    start: new Date(trip.startDate),
                    end: new Date(trip.endDate),
                }]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 300 }}
            />
            <p>National Park: {trip.forest.name}</p>
            <MapContainer center={[forestCoordinates[0]?.lat, forestCoordinates[0]?.lng]} zoom={10} style={{ height: 300 }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon positions={forestCoordinates} color="blue" />
            </MapContainer>
            <h2>Itinerary Events</h2>
            {Object.keys(groupedItems).map(date => (
                <div key={date}>
                    <h3>{date}</h3>
                    {groupedItems[date].map((item, index) => (
                        <div key={index}>
                            <p>Time: {item.time}</p>
                            <p>Note: {item.note}</p>
                            <p>Forest: <span onClick={() => handleLocationClick(item.forestId, 'forest')} style={{ color: 'blue', cursor: 'pointer' }}>{item.forestId}</span></p>
                            <p>Trail: <span onClick={() => handleLocationClick(item.trailId, 'trail')} style={{ color: 'blue', cursor: 'pointer' }}>{item.trailId}</span></p>
                            <p>Campsite: <span onClick={() => handleLocationClick(item.campsiteId, 'campsite')} style={{ color: 'blue', cursor: 'pointer' }}>{item.campsiteId}</span></p>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleEdit}>Edit Trip</button>
            <button onClick={() => setDeleteModalOpen(true)}>Delete Trip</button>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>⋮</button>
                {isDropdownOpen && (
                    <div style={{ position: 'absolute', right: 0, backgroundColor: 'white', border: '1px solid #ccc', zIndex: 1 }}>
                        <button onClick={handleEdit}>Edit Trip</button>
                        <button onClick={() => setDeleteModalOpen(true)}>Delete Trip</button>
                        {trip.creator.id !== currentUser.id && (
                            <button onClick={() => setLeaveModalOpen(true)}>Leave Trip</button>
                        )}
                    </div>
                )}
            </div>
            <Modal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)}>
                <NewTripForm isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} trip={trip} />
            </Modal>
            <Modal isOpen={isLeaveModalOpen} onRequestClose={() => setLeaveModalOpen(false)}>
                <div>
                    <p>Are you sure you want to leave this trip?</p>
                    <button onClick={handleLeave}>Yes</button>
                    <button onClick={() => setLeaveModalOpen(false)}>No</button>
                </div>
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                <div>
                    <p>Are you sure you want to delete this trip?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={() => setDeleteModalOpen(false)}>No</button>
                </div>
            </Modal>
        </div>
    );
};

export default TripDetails;