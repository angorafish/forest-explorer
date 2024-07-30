import '@testing-library/jest-dom';
const axios = require('axios');
jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});