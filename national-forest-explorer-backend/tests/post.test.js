const request = require('supertest');
const express = require('express');
const { Post, Notification, User, Review, Comment, Like, Photo } = require('../models');
const postRouter = require('../routes/post');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');

jest.mock('../middleware/auth');
jest.mock('../models');
jest.mock('../middleware/upload', () => ({
    array: () => (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use(postRouter);

describe('Post routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should fetch all posts', async () => {
            const mockPosts = [
                { id: 1, postType: 'trail', location: 'Forest', rating: 5, reviewText: 'Great!', user: { username: 'user1' }, reviews: [], comments: [], likes: [], photos: [] }
            ];
            Post.findAll.mockResolvedValue(mockPosts);

            const response = await request(app).get('/');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPosts);
            expect(Post.findAll).toHaveBeenCalledWith({
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Review, as: 'reviews' },
                    { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['username'] }] },
                    { model: Like, as: 'likes' },
                    { model: Photo, as: 'photos' }
                ]
            });
        });

        it('should return 500 if fetching posts fails', async () => {
            Post.findAll.mockRejectedValue(new Error('Failed to fetch posts'));

            const response = await request(app).get('/');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch posts' });
        });
    });

    describe('GET /user/:username', () => {
        it('should fetch posts for a specific user', async () => {
            const mockUser = { id: 1, username: 'user1' };
            User.findOne.mockResolvedValue(mockUser);
            const mockPosts = [{ id: 1, postType: 'trail', location: 'Forest', rating: 5, reviewText: 'Great!' }];
            Post.findAll.mockResolvedValue(mockPosts);

            const response = await request(app).get('/user/user1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPosts);
            expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'user1' } });
            expect(Post.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
        });

        it('should return 404 if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app).get('/user/user1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        it('should return 500 if fetching user posts fails', async () => {
            User.findOne.mockResolvedValue({ id: 1, username: 'user1' });
            Post.findAll.mockRejectedValue(new Error('Failed to fetch user posts'));

            const response = await request(app).get('/user/user1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch user posts' });
        });
    });

    describe('GET /:id', () => {
        it('should fetch a specific post by ID', async () => {
            const mockPost = { id: 1, postType: 'trail', location: 'Forest', rating: 5, reviewText: 'Great!', user: { username: 'user1' }, reviews: [], comments: [], likes: [], photos: [] };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app).get('/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPost);
            expect(Post.findByPk).toHaveBeenCalledWith('1', {
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Review, as: 'reviews' },
                    { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['username'] }] },
                    { model: Like, as: 'likes' },
                    { model: Photo, as: 'photos' }
                ]
            });
        });

        it('should return 404 if the post is not found', async () => {
            Post.findByPk.mockResolvedValue(null);

            const response = await request(app).get('/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Post not found' });
        });

        it('should return 500 if fetching the post fails', async () => {
            Post.findByPk.mockRejectedValue(new Error('Failed to fetch post'));

            const response = await request(app).get('/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch post' });
        });
    });

    describe('POST /', () => {
        it('should create a new post with photos for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, postType: 'trail', location: 'Forest', rating: 5, reviewText: 'Great!' };
            const mockFiles = [{ filename: 'photo1.jpg' }, { filename: 'photo2.jpg' }];
            req.files = mockFiles;

            Post.create.mockResolvedValue(mockPost);
            Photo.create.mockResolvedValue({});

            const response = await request(app)
                .post('/')
                .send({ postType: 'trail', location: 'Forest', rating: 5, reviewText: 'Great!' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockPost);
            expect(Post.create).toHaveBeenCalledWith({
                postType: 'trail',
                location: 'Forest',
                rating: 5,
                reviewText: 'Great!',
                userId: 1
            });
            expect(Photo.create).toHaveBeenCalledTimes(2);
        });

        it('should return 500 if creating a post with photos fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.create.mockRejectedValue(new Error('Failed to create post'));

            const response = await request(app)
                .post('/')
                .send({ postType: 'trail', location: 'Forest', rating: 5, reviewText: 'Great!' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to create post' });
        });
    });

    describe('POST /:id/like', () => {
        it('should like a post for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 2 };
            Post.findByPk.mockResolvedValue(mockPost);
            Like.findOne.mockResolvedValue(null);
            const mockLike = { id: 1, postId: 1, userId: 1 };
            Like.create.mockResolvedValue(mockLike);

            const response = await request(app).post('/1/like').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Post liked and notification created' });
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

            const response = await request(app).post('/1/like').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Post not found' });
        });

        it('should return 400 if the post is already liked', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 2 };
            Post.findByPk.mockResolvedValue(mockPost);
            Like.findOne.mockResolvedValue({ id: 1 });

            const response = await request(app).post('/1/like').set('Authorization', 'Bearer token');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'You already liked this post' });
        });

        it('should return 500 if liking the post fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 2 };
            Post.findByPk.mockResolvedValue(mockPost);
            Like.findOne.mockResolvedValue(null);
            Like.create.mockRejectedValue(new Error('Failed to like post'));

            const response = await request(app).post('/1/like').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to like post' });
        });
    });

    describe('PUT /:id', () => {
        it('should update a specific post by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 1, update: jest.fn() };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app)
                .put('/1')
                .send({ reviewText: 'Updated Text' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPost);
            expect(mockPost.update).toHaveBeenCalledWith({ reviewText: 'Updated Text' });
        });

        it('should return 404 if the post is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .put('/1')
                .send({ reviewText: 'Updated Text' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Post not found' });
        });

        it('should return 403 if the user is not authorized to update the post', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 2 };
                next();
            });
            const mockPost = { id: 1, userId: 1 };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app)
                .put('/1')
                .send({ reviewText: 'Updated Text' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });

        it('should return 500 if updating the post fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 1, update: jest.fn().mockRejectedValue(new Error('Failed to update post')) };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app)
                .put('/1')
                .send({ reviewText: 'Updated Text' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update post' });
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a specific post by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 1, destroy: jest.fn() };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Post deleted successfully' });
            expect(mockPost.destroy).toHaveBeenCalled();
        });

        it('should return 404 if the post is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Post.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Post not found' });
        });

        it('should return 403 if the user is not authorized to delete the post', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 2 };
                next();
            });
            const mockPost = { id: 1, userId: 1 };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });

        it('should return 500 if deleting the post fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPost = { id: 1, userId: 1, destroy: jest.fn().mockRejectedValue(new Error('Failed to delete post')) };
            Post.findByPk.mockResolvedValue(mockPost);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete post' });
        });
    });
});