import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';

const Saved = () => {
  const { currentUser } = useAuth();
  const [savedLocations, setSavedLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(`http://localhost:3000/api/savedLocations/user/${currentUser.id}`);
          setSavedLocations(response.data);
        }
      } catch (error) {
        console.error('Error fetching saved locations:', error);
      }
    };

    fetchSavedLocations();
  }, [currentUser]);

  const handleToggleSave = async (locationId, locationType) => {
    const isSaved = savedLocations.some(loc => loc.locationId === locationId && loc.locationType === locationType);
    try {
      if (isSaved) {
        await axios.delete('http://localhost:3000/api/savedLocations/unsave', {
          data: { userId: currentUser.id, locationId, locationType }
        });
        setSavedLocations(savedLocations.filter(loc => !(loc.locationId === locationId && loc.locationType === locationType)));
      } else {
        await axios.post('http://localhost:3000/api/savedLocations/save', {
          userId: currentUser.id, locationId, locationType
        });
        setSavedLocations([...savedLocations, { locationId, locationType, userId: currentUser.id, name: "Location Name" }]);
      }
    } catch (error) {
      console.error(`Error ${isSaved ? 'unsaving' : 'saving'} location:`, error);
    }
  };

  return (
    <div>
      <h1>Saved Locations</h1>
      {savedLocations.length === 0 ? (
        <p>No saved locations.</p>
      ) : (
        <ul>
          {savedLocations.map((loc) => (
            <li key={`${loc.locationId}-${loc.locationType}`}>
              <span onClick={() => navigate(`/details/${loc.locationType}/${loc.locationId}`)}>
                {loc.name}
              </span>
              <FontAwesomeIcon
                icon={savedLocations.some(savedLoc => savedLoc.locationId === loc.locationId && savedLoc.locationType === loc.locationType) ? filledHeart : hollowHeart}
                onClick={() => handleToggleSave(loc.locationId, loc.locationType)}
                style={{ cursor: 'pointer', color: savedLocations.some(savedLoc => savedLoc.locationId === loc.locationId && savedLoc.locationType === loc.locationType) ? 'red' : 'grey', marginLeft: '10px' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Saved;