const request = require('supertest');
const express = require('express');
const { Forest, Trail, Campsite, Post } = require('../models');
const detailsRouter = require('../routes/details');

jest.mock('../models');

const app = express();
app.use(express.json());
app.use(detailsRouter);

describe('Details routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /forests/:id', () => {
        it('should fetch forest details and related posts', async () => {
            const mockForest = { id: 1, name: 'Test Forest' };
            const mockPosts = [{ id: 1, title: 'Test Post' }];
            Forest.findByPk.mockResolvedValue(mockForest);
            Post.findAll.mockResolvedValue(mockPosts);

            const response = await request(app).get('/forests/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ ...mockForest, posts: mockPosts });
            expect(Forest.findByPk).toHaveBeenCalledWith('1');
            expect(Post.findAll).toHaveBeenCalledWith({ where: { forestId: '1' } });
        });

        it('should return 404 if forest is not found', async () => {
            Forest.findByPk.mockResolvedValue(null);

            const response = await request(app).get('/forests/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Forest not found' });
        });

        it('should return 500 if fetching forest details fails', async () => {
            Forest.findByPk.mockRejectedValue(new Error('Failed to fetch forest'));

            const response = await request(app).get('/forests/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal server error' });
        });
    });
});