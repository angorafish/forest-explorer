const setup = require('./setup');
const teardown = require('./teardown');

beforeAll(setup);
afterAll(teardown);

describe('GET /api/campsites', () => {
    it('should fetch all campsites', async () => {
        const res = await global.testRequest.get('/api/campsites');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });
});