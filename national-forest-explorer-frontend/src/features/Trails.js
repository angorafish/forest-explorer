import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trails() {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/trails')
            .then(response => {
                setTrails(response.data);
            })
            .catch(error => {
                console.error('Error fetching trails:', error);
            });
    }, []);

    return (
        <div>
            <h2>Trails</h2>
            {trails.map(trail => (
                <div key={trail.id}>
                    <h3>{trail.name}</h3>
                    <p>{trail.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Trails;
