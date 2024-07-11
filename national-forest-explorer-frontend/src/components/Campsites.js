import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Campsites() {
    const [campsites, setCampsites] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/campsites')
            .then(response => {
                setCampsites(response.data);
            })
            .catch(error => {
                console.error('Error fetching campsites:', error);
            });
    }, []);

    return (
        <div>
            <h2>Campsites</h2>
            {campsites.map(campsite => (
                <div key={campsite.id}>
                    <h3>{campsite.name}</h3>
                    <p>{campsite.location}</p>
                </div>
            ))}
        </div>
    );
}

export default Campsites;