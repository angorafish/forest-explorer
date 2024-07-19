const request = require('supertest');
const express = require('express');
const { Like, Post, Notification } = require('../models');
const likeRouter = require('../routes/like');
const authenticateToken = require('../middleware/auth');

jest.mock('../middleware/auth');
jest.mock('../models');

const app = express();
app.use(express.json());
app.use(likeRouter);

describe('Like routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /:postId', () => {
        it('should like a post for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue({ id: 1, userId: 2 });
            Like.findOne.mockResolvedValue(null);
            const mockLike = { id: 1, postId: 1, userId: 1 };
            Like.create.mockResolvedValue(mockLike);

            const response = await request(app).post('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockLike);
            expect(Like.create).toHaveBeenCalledWith({ postId: 1, userId: 1 });
            expect(Notification.create).toHaveBeenCalledWith({
                userId: 2,
                fromUserId: 1,
                type: 'like',
            });
        });

        it('should return 404 if the post is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue(null);

            const response = await request(app).post('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Post not found' });
        });

        it('should return 400 if the post is already liked', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue({ id: 1, userId: 2 });
            Like.findOne.mockResolvedValue({ id: 1 });

            const response = await request(app).post('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'You already liked this post' });
        });

        it('should return 500 if liking the post fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue({ id: 1, userId: 2 });
            Like.findOne.mockResolvedValue(null);
            Like.create.mockRejectedValue(new Error('Failed to like post'));

            const response = await request(app).post('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to like post' });
        });
    });

    describe('DELETE /:postId', () => {
        it('should unlike a post for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue({ id: 1 });
            const mockLike = { id: 1, destroy: jest.fn() };
            Like.findOne.mockResolvedValue(mockLike);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Post unliked successfully' });
            expect(mockLike.destroy).toHaveBeenCalled();
        });

        it('should return 404 if the post is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Post not found' });
        });

        it('should return 400 if the post is not liked', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue({ id: 1 });
            Like.findOne.mockResolvedValue(null);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'You have not liked this post' });
        });

        it('should return 500 if unliking the post fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue({ id: 1 });
            Like.findOne.mockResolvedValue({ id: 1, destroy: jest.fn().mockRejectedValue(new Error('Failed to unlike post')) });

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to unlike post' });
        });
    });
});