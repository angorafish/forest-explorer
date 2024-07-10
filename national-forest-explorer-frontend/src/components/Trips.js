import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/axiosConfig';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get('/trips');
                setTrips(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch trips.");
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>My Trips</h1>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <h2>{trip.name}</h2>
                        <p>{trip.description}</p>
                    </li>
                ))}
            </ul>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default Trips;