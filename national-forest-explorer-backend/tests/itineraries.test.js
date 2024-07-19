const request = require('supertest');
const express = require('express');
const { Itinerary, ItineraryItem, User } = require('../models');
const itinerariesRouter = require('../routes/itineraries');
const authenticateToken = require('../middleware/auth');
const { sendInvitationEmail } = require('../services/emailService');

jest.mock('../middleware/auth');
jest.mock('../models');
jest.mock('../services/emailService');

const app = express();
app.use(express.json());
app.use(itinerariesRouter);

describe('Itineraries routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should fetch itineraries for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItineraries = [
                { id: 1, name: 'Test Itinerary', items: [] }
            ];
            Itinerary.findAll.mockResolvedValue(mockItineraries);

            const response = await request(app).get('/').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItineraries);
            expect(Itinerary.findAll).toHaveBeenCalledWith({
                where: { userId: 1 },
                include: { model: ItineraryItem, as: 'items' }
            });
        });

        it('should return 500 if fetching itineraries fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findAll.mockRejectedValue(new Error('Failed to fetch itineraries'));

            const response = await request(app).get('/').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch itineraries' });
        });
    });

    describe('POST /', () => {
        it('should create a new itinerary for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItinerary = { id: 1, name: 'Test Itinerary' };
            Itinerary.create.mockResolvedValue(mockItinerary);

            const response = await request(app)
                .post('/')
                .send({ name: 'Test Itinerary' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockItinerary);
            expect(Itinerary.create).toHaveBeenCalledWith({ name: 'Test Itinerary', userId: 1 });
        });

        it('should return 500 if creating an itinerary fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.create.mockRejectedValue(new Error('Failed to create itinerary'));

            const response = await request(app)
                .post('/')
                .send({ name: 'Test Itinerary' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create itinerary' });
        });
    });

    describe('GET /:id', () => {
        it('should fetch a specific itinerary by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItinerary = { id: 1, name: 'Test Itinerary', items: [] };
            Itinerary.findByPk.mockResolvedValue(mockItinerary);

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItinerary);
            expect(Itinerary.findByPk).toHaveBeenCalledWith('1', {
                include: { model: ItineraryItem, as: 'items' }
            });
        });

        it('should return 404 if the itinerary is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockResolvedValue(null);

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary not found' });
        });

        it('should return 500 if fetching the itinerary fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockRejectedValue(new Error('Failed to fetch itinerary'));

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch itinerary' });
        });
    });

    describe('PUT /:id', () => {
        it('should update a specific itinerary by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockUpdatedItinerary = { id: 1, name: 'Updated Itinerary' };
            Itinerary.update.mockResolvedValue([1, [mockUpdatedItinerary]]);

            const response = await request(app)
                .put('/1')
                .send({ name: 'Updated Itinerary' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUpdatedItinerary);
            expect(Itinerary.update).toHaveBeenCalledWith(
                { name: 'Updated Itinerary' },
                { where: { id: '1', userId: 1 }, returning: true }
            );
        });

        it('should return 404 if the itinerary is not found or user not authorized', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.update.mockResolvedValue([0, []]);

            const response = await request(app)
                .put('/1')
                .send({ name: 'Updated Itinerary' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary not found or user not authorized' });
        });

        it('should return 500 if updating the itinerary fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.update.mockRejectedValue(new Error('Failed to update itinerary'));

            const response = await request(app)
                .put('/1')
                .send({ name: 'Updated Itinerary' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update itinerary' });
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a specific itinerary by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.destroy.mockResolvedValue(1);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Itinerary deleted' });
            expect(Itinerary.destroy).toHaveBeenCalledWith({ where: { id: '1', userId: 1 } });
        });

        it('should return 404 if the itinerary is not found or user not authorized', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.destroy.mockResolvedValue(0);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary not found or user not authorized' });
        });

        it('should return 500 if deleting the itinerary fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.destroy.mockRejectedValue(new Error('Failed to delete itinerary'));

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete itinerary' });
        });
    });

    describe('POST /:id/invite', () => {
        it('should send an invitation email for the itinerary', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItinerary = { id: 1, name: 'Test Itinerary' };
            Itinerary.findByPk.mockResolvedValue(mockItinerary);

            const response = await request(app)
                .post('/1/invite')
                .send({ email: 'test@example.com' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Invitation sent' });
            expect(sendInvitationEmail).toHaveBeenCalledWith('test@example.com', mockItinerary);
        });

        it('should return 404 if the itinerary is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .post('/1/invite')
                .send({ email: 'test@example.com' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary not found' });
        });

        it('should return 500 if sending the invitation fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockResolvedValue({ id: 1, name: 'Test Itinerary' });
            sendInvitationEmail.mockRejectedValue(new Error('Failed to send invitation'));

            const response = await request(app)
                .post('/1/invite')
                .send({ email: 'test@example.com' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to send invitation' });
        });
    });
});