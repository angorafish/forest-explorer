const request = require('supertest');
const express = require('express');
const forestService = require('../services/forestService');
const forestRouter = require('../routes/forest');

jest.mock('../services/forestService');

const app = express();
app.use(express.json());
app.use(forestRouter);

describe('Forest routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should fetch all forests', async () => {
            const mockForests = [{ id: 1, name: 'Test Forest' }];
            forestService.getAllForests.mockResolvedValue(mockForests);

            const response = await request(app).get('/');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockForests);
            expect(forestService.getAllForests).toHaveBeenCalled();
        });

        it('should return 500 if fetching forests fails', async () => {
            forestService.getAllForests.mockRejectedValue(new Error('Failed to fetch forests'));

            const response = await request(app).get('/');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch national forests data' });
        });
    });
});