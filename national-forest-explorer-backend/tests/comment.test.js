const request = require('supertest');
const express = require('express');
const { Comment, User, Notification, Post } = require('../models');
const commentRouter = require('../routes/comment');
const authenticateToken = require('../middleware/auth');
const { io } = require('../index');

jest.mock('../middleware/auth');
jest.mock('../models');
jest.mock('../index', () => ({
    io: { to: jest.fn().mockReturnValue({ emit: jest.fn() }) }
}));

const app = express();
app.use(express.json());
app.use(commentRouter);

describe('Comment routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /:postId', () => {
        it('should fetch comments for a post', async () => {
            authenticateToken.mockImplementation((req, res, next) => next());
            const mockComments = [
                { id: 1, text: 'Test comment', user: { username: 'testuser' } }
            ];
            Comment.findAll.mockResolvedValue(mockComments);

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockComments);
            expect(Comment.findAll).toHaveBeenCalledWith({
                where: { postId: '1' },
                include: [{ model: User, as: 'user', attributes: ['username'] }]
            });
        });

        it('should return 500 if fetching comments fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => next());
            Comment.findAll.mockRejectedValue(new Error('Failed to fetch comments'));

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch comments' });
        });
    });

    describe('POST /', () => {
        it('should create a new comment', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 2 };
            const mockComment = { id: 1, text: 'Test comment' };
            Post.findByPk.mockResolvedValue(mockPost);
            Comment.create.mockResolvedValue(mockComment);
            Notification.create.mockResolvedValue({});

            const response = await request(app)
                .post('/')
                .send({ postId: 1, text: 'Test comment' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockComment);
            expect(Comment.create).toHaveBeenCalledWith({
                userId: 1,
                postId: 1,
                text: 'Test comment'
            });
            expect(io.to).toHaveBeenCalledWith('2');
            expect(io.to().emit).toHaveBeenCalledWith('new_notification', {
                type: 'comment',
                notification: expect.any(Object),
                comment: mockComment,
            });
        });

        it('should return 500 if creating a comment fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Comment.create.mockRejectedValue(new Error('Failed to create comment'));

            const response = await request(app)
                .post('/')
                .send({ postId: 1, text: 'Test comment' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create comment' });
        });
    });
});