const request = require('supertest');
const express = require('express');
const { ItineraryItem, Itinerary } = require('../models');
const itineraryItemRouter = require('../routes/itineraryItem');
const authenticateToken = require('../middleware/auth');

jest.mock('../middleware/auth');
jest.mock('../models');

const app = express();
app.use(express.json());
app.use(itineraryItemRouter);

describe('ItineraryItem routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /', () => {
        it('should create a new itinerary item for the authenticated user', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockResolvedValue({ id: 1 });
            const mockItem = { id: 1, note: 'Test Item' };
            ItineraryItem.create.mockResolvedValue(mockItem);

            const response = await request(app)
                .post('/')
                .send({ itineraryId: 1, note: 'Test Item' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockItem);
            expect(ItineraryItem.create).toHaveBeenCalledWith({
                itineraryId: 1,
                note: 'Test Item',
                forestId: undefined,
                trailId: undefined,
                campsiteId: undefined,
                date: undefined,
                time: undefined,
            });
        });

        it('should return 404 if the itinerary is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .post('/')
                .send({ itineraryId: 1, note: 'Test Item' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary not found' });
        });

        it('should return 500 if creating an itinerary item fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            Itinerary.findByPk.mockResolvedValue({ id: 1 });
            ItineraryItem.create.mockRejectedValue(new Error('Failed to create itinerary item'));

            const response = await request(app)
                .post('/')
                .send({ itineraryId: 1, note: 'Test Item' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create itinerary item' });
        });
    });

    describe('GET /:itineraryId', () => {
        it('should fetch itinerary items for a specific itinerary', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItems = [{ id: 1, note: 'Test Item' }];
            ItineraryItem.findAll.mockResolvedValue(mockItems);

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItems);
            expect(ItineraryItem.findAll).toHaveBeenCalledWith({ where: { itineraryId: '1' } });
        });

        it('should return 500 if fetching itinerary items fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            ItineraryItem.findAll.mockRejectedValue(new Error('Failed to fetch itinerary items'));

            const response = await request(app).get('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch itinerary items' });
        });
    });

    describe('PUT /:id', () => {
        it('should update a specific itinerary item by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItem = { id: 1, note: 'Updated Item', update: jest.fn() };
            ItineraryItem.findByPk.mockResolvedValue(mockItem);

            const response = await request(app)
                .put('/1')
                .send({ note: 'Updated Item' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItem);
            expect(mockItem.update).toHaveBeenCalledWith({ note: 'Updated Item' });
        });

        it('should return 404 if the itinerary item is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            ItineraryItem.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .put('/1')
                .send({ note: 'Updated Item' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary item not found' });
        });

        it('should return 500 if updating the itinerary item fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            ItineraryItem.findByPk.mockRejectedValue(new Error('Failed to update itinerary item'));

            const response = await request(app)
                .put('/1')
                .send({ note: 'Updated Item' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update itinerary item' });
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a specific itinerary item by ID', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            const mockItem = { id: 1, destroy: jest.fn() };
            ItineraryItem.findByPk.mockResolvedValue(mockItem);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Itinerary item deleted' });
            expect(mockItem.destroy).toHaveBeenCalled();
        });

        it('should return 404 if the itinerary item is not found', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            ItineraryItem.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Itinerary item not found' });
        });

        it('should return 500 if deleting the itinerary item fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            ItineraryItem.findByPk.mockRejectedValue(new Error('Failed to delete itinerary item'));

            const response = await request(app).delete('/1').set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete itinerary item' });
        });
    });
});
