const request = require('supertest');
const express = require('express');
const { Feed, User } = require('../models');
const feedRouter = require('../routes/feed');
const authenticateToken = require('../middleware/auth');

jest.mock('../middleware/auth');
jest.mock('../models');

const app = express();
app.use(express.json());
app.use(feedRouter);

describe('Feed routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should fetch user feed', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockFeed = [{ id: 1, content: 'Test feed', author: { username: 'testuser' } }];
            Feed.findAll.mockResolvedValue(mockFeed);

            const response = await request(app).get('/').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockFeed);
            expect(Feed.findAll).toHaveBeenCalledWith({
                where: { userId: 1 },
                include: [{ model: User, as: 'author' }]
            });
        });

        it('should return 500 if fetching feed fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Feed.findAll.mockRejectedValue(new Error('Failed to fetch feed'));

            const response = await request(app).get('/').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch feed' });
        });
    });
});