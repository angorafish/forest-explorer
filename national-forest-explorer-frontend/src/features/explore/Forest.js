import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from '../../services/axiosConfig';
import './explore.css';

// Logic for displaying forest details
const Forest = () => {
    const { id } = useParams();
    // State to store forest details, manage loading status, and manage errors
    const [forest, setForest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch forest details when component mounts
    useEffect(() => {
        const fetchForest = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/forests/nps/${id}`);
                setForest(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch forest details. Please try again later.");
                setLoading(false);
            }
        };

        fetchForest();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!forest) return <div>No forest details available.</div>;

    return (
        <div>
            <h1>{forest.fullName}</h1>
            <p>{forest.description}</p>
            <ul>
                {forest.trails && forest.trails.map(trail => (
                    <li key={trail.id}>
                        <Link to={`/trail/${trail.id}`}>{trail.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Forest;