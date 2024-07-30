import React, { useState } from 'react';
import axios from '../../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './explore.css';
import forestImage from '../../assets/us-forest-land.jpg';

// Logic for explore/search page
const Explore = () => {
  // State management for search input, search suggestions, and search results
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Handle input change and fetch suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      try {
        const response = await axios.get(`http://localhost:3000/api/search/suggestions?q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle search action
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/search', {
        params: { q: searchInput },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.name);
    setSuggestions([]);
    handleSearch();
  };

  // Handle result click
  const handleResultClick = (id, type) => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <div>
      <div className="search-bar" style={{ position: 'relative' }}>
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
      <div>
        <img src={forestImage} alt="US National Forest Land" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div>
        {searchResults.map((result, index) => (
          <div key={index} onClick={() => handleResultClick(result.id, result.type.toLowerCase())}>
            <h3>{result.name}</h3>
            <p>{result.type} in {result.state || 'Unknown'}</p>
            <p>{result.forest || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;