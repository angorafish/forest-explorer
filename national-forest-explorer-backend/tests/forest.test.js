const request = require('supertest');
const { app } = require('../index');

describe('GET /api/forests', () => {
    it('should fetch all forests', async () => {
        const res = await global.testRequest.get('/api/forests');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });
});
