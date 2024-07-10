import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from '../services/axiosConfig';

const Forest = () => {
    const { id } = useParams();
    const [forest, setForest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForest = async () => {
            try {
                const response = await axios.get(`/forests/nps/${id}`);
                setForest(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch forest details.");
                setLoading(false);
            }
        };

        fetchForest();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{forest.fullName}</h1>
            <p>{forest.description}</p>
            <ul>
                {forest.trails.map(trail => (
                    <li key={trail.id}>
                        <Link to={`/trail/${trail.id}`}>{trail.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Forest;