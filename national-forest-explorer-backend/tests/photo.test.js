const request = require('supertest');
const express = require('express');
const { Photo } = require('../models');
const photoRouter = require('../routes/photo');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');

jest.mock('../middleware/auth');
jest.mock('../models');
jest.mock('../middleware/upload', () => ({
    array: () => (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use(photoRouter);

describe('Photo routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /user/:userId', () => {
        it('should fetch photos for a specific user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPhotos = [{ id: 1, url: 'photo1.jpg' }];
            Photo.findAll.mockResolvedValue(mockPhotos);

            const response = await request(app).get('/user/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPhotos);
            expect(Photo.findAll).toHaveBeenCalledWith({ where: { userId: '1' } });
        });

        it('should return 500 if fetching photos fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Photo.findAll.mockRejectedValue(new Error('Failed to fetch photos'));

            const response = await request(app).get('/user/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch photos' });
        });
    });

    describe('GET /post/:postId', () => {
        it('should fetch photos for a specific post', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPhotos = [{ id: 1, url: 'photo1.jpg' }];
            Photo.findAll.mockResolvedValue(mockPhotos);

            const response = await request(app).get('/post/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPhotos);
            expect(Photo.findAll).toHaveBeenCalledWith({ where: { postId: '1' } });
        });

        it('should return 500 if fetching photos fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Photo.findAll.mockRejectedValue(new Error('Failed to fetch photos'));

            const response = await request(app).get('/post/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch photos' });
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

    describe('DELETE /:id', () => {
        it('should delete a specific photo by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockPhoto = { id: 1, userId: 1, destroy: jest.fn() };
            Photo.findByPk.mockResolvedValue(mockPhoto);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Photo deleted successfully' });
            expect(mockPhoto.destroy).toHaveBeenCalled();
        });

        it('should return 404 if the photo is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Photo.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Photo not found' });
        });

        it('should return 403 if the user is not authorized to delete the photo', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 2 };
                next();
            });
            const mockPhoto = { id: 1, userId: 1 };
            Photo.findByPk.mockResolvedValue(mockPhoto);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(403);
            expect(response.body).toEqual({ error: 'Unauthorized' });
        });

        it('should return 500 if deleting the photo fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Photo.findByPk.mockRejectedValue(new Error('Failed to delete photo'));

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete photo' });
        });
    });
});