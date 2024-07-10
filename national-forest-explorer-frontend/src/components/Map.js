import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from '../services/axiosConfig';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 37.0902,
  lng: -95.7129
};

const Map = () => {
  const [forests, setForests] = useState([]);
  const [selectedForest, setSelectedForest] = useState(null);

  useEffect(() => {
    const fetchForests = async () => {
      try {
        const response = await axios.get('/national-forests');
        setForests(response.data);
      } catch (error) {
        console.error('Error fetching forests data:', error);
      }
    };

    fetchForests();
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
        {forests.map(forest => (
          <Marker
            key={forest.id}
            position={{ lat: parseFloat(forest.latitude), lng: parseFloat(forest.longitude) }}
            onClick={() => setSelectedForest(forest)}
          />
        ))}

        {selectedForest && (
          <InfoWindow
            position={{ lat: parseFloat(selectedForest.latitude), lng: parseFloat(selectedForest.longitude) }}
            onCloseClick={() => setSelectedForest(null)}
          >
            <div>
              <h2>{selectedForest.fullName}</h2>
              <p>{selectedForest.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;