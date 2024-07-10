import axios from './services/axiosConfig';

export const fetchForests = async () => {
    try {
        const response = await axios.get('/forests/nps');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};