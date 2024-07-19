const request = require('supertest');
const app = require('../index'); // Adjust the path as necessary
const trailService = require('../services/trailService');

jest.mock('../services/trailService');

describe('Trail Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should fetch all trails', async () => {
            const mockTrails = [{ id: 1, name: 'Trail1' }];
            trailService.getAllTrails.mockResolvedValue(mockTrails);

            const response = await request(app).get('/trail');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTrails);
            expect(trailService.getAllTrails).toHaveBeenCalled();
        });

        it('should return 500 if fetching trails fails', async () => {
            trailService.getAllTrails.mockRejectedValue(new Error('Failed to fetch trails'));

            const response = await request(app).get('/trail');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch trails' });
        });
    });
});