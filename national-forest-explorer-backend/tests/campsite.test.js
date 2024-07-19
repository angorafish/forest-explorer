const request = require('supertest');
const express = require('express');
const campsiteRouter = require('../routes/campsite');
const campsiteService = require('../services/campsiteService');

jest.mock('../services/campsiteService');

const app = express();
app.use(express.json());
app.use('/api/campsites', campsiteRouter);

describe('Campsite Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/campsites', () => {
        it('should fetch all campsites and return them as JSON', async () => {
            const mockCampsites = [
                { id: 1, name: 'Campsite 1' },
                { id: 2, name: 'Campsite 2' }
            ];
            campsiteService.getAllCampsites.mockResolvedValue(mockCampsites);

            const response = await request(app).get('/api/campsites');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCampsites);
            expect(campsiteService.getAllCampsites).toHaveBeenCalledTimes(1);
        });

        it('should handle errors and return a 500 status code', async () => {
            campsiteService.getAllCampsites.mockRejectedValue(new Error('Failed to fetch campsites'));

            const response = await request(app).get('/api/campsites');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch campsites' });
            expect(campsiteService.getAllCampsites).toHaveBeenCalledTimes(1);
        });
    });
});