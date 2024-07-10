import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/axiosConfig';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/search?q=${query}`);
            setResults(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch search results.");
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search for forests, trails, campsites..." 
                />
                <button type="submit">Search</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <ul>
                {results.map(result => (
                    <li key={result.id}>
                        <Link to={`/forest/${result.id}`}>{result.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default Search;