import '@testing-library/jest-dom/extend-expect';
const axios = require('axios');
jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});