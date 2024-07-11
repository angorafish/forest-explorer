const setup = require('./setup');
const teardown = require('./teardown');

beforeAll(setup);
afterAll(teardown);

describe('GET /api/trails', () => {
    it('should fetch all trails', async () => {
        const res = await global.testRequest.get('/api/trails');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });
});