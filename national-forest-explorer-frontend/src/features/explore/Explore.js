import React, { useState } from 'react';
import axios from '../../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './explore.css';
import forestImage from '../../assets/us-forest-land.jpg';

// Logic for explore/search page
const Explore = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search/suggestions?q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search`, {
        params: { q: searchInput },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.name);
    setSuggestions([]);
    handleSearch();
  };

  const handleResultClick = (id, type) => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <div className="explore-content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for forests or trails..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name || 'No Name Available'} - {suggestion.type}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="results-container">
        {searchResults.map((result, index) => (
          <div key={index} className="result-item" onClick={() => handleResultClick(result.id, result.type.toLowerCase())}>
            <div className="result-title">{result.name}</div>
            {result.type && result.state && (
              <div className="result-description">{result.type} in {result.state}</div>
            )}
            {result.forest && (
              <div className="result-description">{result.forest}</div>
            )}
          </div>
        ))}
      </div>
      <div className="map-container">
        <img src={forestImage} alt="US National Forest Land" />
      </div>
    </div>
  );
};

export default Explore;
