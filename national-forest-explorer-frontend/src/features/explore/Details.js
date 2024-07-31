import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';
import './explore.css';

// Logic to show location details of trails and forests
const Details = () => {
  const { type, id } = useParams(); // Extract params from URL
  // State to store details of location and track if location is saved
  const [details, setDetails] = useState(null); 
  const [isSaved, setIsSaved] = useState(false);
  // Access current user from auth context
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch details and saved locations when component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/details/${type}s/${id}`);
        console.log('Fetched details:', response.data);
        setDetails(response.data);

        if (currentUser) {
          const savedResponse = await axios.get(`http://localhost:3000/api/savedLocations/user/${currentUser.id}`);
          const saved = savedResponse.data.some(loc => loc.locationId === parseInt(id) && loc.locationType === type);
          setIsSaved(saved);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [type, id, currentUser]);

  // Handle saving and unsaving location
  const handleSaveLocation = async () => {
    if (!currentUser) return;
    try {
      if (isSaved) {
        await axios.delete('http://localhost:3000/api/savedLocations/unsave', {
          data: { userId: currentUser.id, locationId: parseInt(id), locationType: type }
        });
      } else {
        await axios.post('http://localhost:3000/api/savedLocations/save', {
          userId: currentUser.id, locationId: parseInt(id), locationType: type
        });
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error(`Error ${isSaved ? 'unsaving' : 'saving'} location:`, error);
    }
  };

  // Render loading message if details haven't loaded yet
  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      {/* Back button to return to the Explore page */}
      <button onClick={() => navigate('/explore')} className="back-button">Back to Explore</button>
      
      <h1>{details.name}</h1>
      
      <p>Type: {type}</p>
      
      {/* Conditionally render details based on type */}
      {type === 'forest' ? (
        <>
          {details.region && <p>Region: {details.region}</p>}
          {details.shapeArea && <p>Size: {details.shapeArea} acres</p>}
        </>
      ) : (
        <>
          {details.state && <p>State: {details.state}</p>}
          {details.forest && <p>Forest: {details.forest}</p>}
        </>
      )}
      
      {/* Display save/unsave button if user is logged in */}
      {currentUser && (
        <FontAwesomeIcon
          icon={isSaved ? filledHeart : hollowHeart}
          onClick={handleSaveLocation}
          style={{ cursor: 'pointer', color: isSaved ? 'red' : 'grey', marginLeft: '10px' }}
        />
      )}
    </div>
  );
};

export default Details;