import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Explore.css';

const Explore = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      try {
        console.log(`Fetching suggestions for: ${value}`);
        const response = await axios.get(`http://localhost:3000/api/search/suggestions?q=${value}`);
        console.log('Suggestions response:', response.data);
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
      console.log(`Searching for: ${searchInput}, State: ${selectedState}, Destination: ${selectedDestination}`);
      const response = await axios.get(`http://localhost:3000/api/search`, {
        params: {
          q: searchInput,
          state: selectedState,
          destination: selectedDestination,
        },
      });
      console.log('Search results:', response.data);
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
    <div>
      <div className="search-bar" style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search for forests, campsites, trails..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Filter by State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
          <option value="">Filter by Destination</option>
          <option value="forest">Forest</option>
          <option value="campsite">Campsite</option>
          <option value="trail">Trail</option>
        </select>
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
        <img src="/us-forest-land.jpg" alt="US National Forest Land" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div>
        {searchResults.map((result, index) => (
          <div key={index} onClick={() => handleResultClick(result.id, result.type.toLowerCase())}>
            <h3>{result.name}</h3>
            <p>{result.type} in {result.state}</p>
            <p>{result.forest}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;