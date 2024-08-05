import axios from 'axios';

// Creating an axios instance with predefined configuration
const instance = axios.create({
    // The base URL for all API requests
    baseURL: `${process.env.REACT_APP_API_URL}api`,
    // Default headers for all requests
    headers: {
        'Content-Type': 'application/json'
    },
    // Allowing credentials such as cookies to be sent with requests
    withCredentials: true
});

// Adding a request interceptor to include the authorization token in headers
instance.interceptors.request.use(
    (config) => {
        // Retrieving the token from local storage
        const token = localStorage.getItem('token');
        // If a token is found, add it to the request headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Returning the updated config
        return config;
    },
    (error) => {
        // Handling errors and rejecting the promise if something goes wrong
        return Promise.reject(error);
    }
);

export default instance;