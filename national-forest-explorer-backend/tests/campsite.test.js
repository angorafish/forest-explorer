const request = require('supertest');
const { app } = require('../index');

describe('GET /api/campsites', () => {
    it('should fetch all campsites', async () => {
        const res = await global.testRequest.get('/api/campsites');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });
});
