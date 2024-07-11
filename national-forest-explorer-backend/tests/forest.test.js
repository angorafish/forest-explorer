const setup = require('./setup');
const teardown = require('./teardown');

beforeAll(setup);
afterAll(teardown);

describe('GET /api/forests', () => {
    it('should fetch all forests', async () => {
        const res = await global.testRequest.get('/api/forests');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    });
});