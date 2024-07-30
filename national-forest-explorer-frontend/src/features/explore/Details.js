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

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{details.name}</h1>
      <p>Type: {type}</p>
      {type === 'forest' ? (
        <>
          <p>Region: {details.region || 'Unknown'}</p>
          <p>Size: {details.shapeArea ? `${details.shapeArea} acres` : 'Unknown'}</p>
        </>
      ) : (
        <>
          <p>State: {details.state || 'Unknown'}</p>
          <p>Forest: {details.forest || 'Unknown'}</p>
        </>
      )}
      {currentUser && (
        <FontAwesomeIcon
          icon={isSaved ? filledHeart : hollowHeart}
          onClick={handleSaveLocation}
          style={{ cursor: 'pointer', color: isSaved ? 'red' : 'grey', marginLeft: '10px' }}
        />
      )}
      <h2>Recent Reviews/Photos</h2>
      <div>
        {details.posts && details.posts.length > 0 ? (
          details.posts.map((post) => (
            <div key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
              <h3>{post.title}</h3>
              <p>{post.reviewText}</p>
            </div>
          ))
        ) : (
          <p>No recent reviews/photos available.</p>
        )}
      </div>
    </div>
  );
};

export default Details;