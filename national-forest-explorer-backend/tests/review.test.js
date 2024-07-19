const request = require('supertest');
const app = require('../index');
const { Review } = require('../models');

jest.mock('../models');

describe('Review Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /', () => {
        it('should create a new review', async () => {
            const mockReview = { id: 1, userId: 1, forestId: 1, rating: 5, comment: 'Great place!' };
            Review.create.mockResolvedValue(mockReview);

            const response = await request(app)
                .post('/review')
                .send({ forestId: 1, rating: 5, comment: 'Great place!' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockReview);
            expect(Review.create).toHaveBeenCalledWith(expect.objectContaining({ forestId: 1, rating: 5, comment: 'Great place!' }));
        });

        it('should return 500 if creating a review fails', async () => {
            Review.create.mockRejectedValue(new Error('Failed to create review'));

            const response = await request(app)
                .post('/review')
                .send({ forestId: 1, rating: 5, comment: 'Great place!' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create review' });
        });
    });

    describe('GET /:locationId', () => {
        it('should fetch reviews for a specific location', async () => {
            const mockReviews = [{ id: 1, forestId: 1, rating: 5, comment: 'Great place!' }];
            Review.findAll.mockResolvedValue(mockReviews);

            const response = await request(app).get('/review/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockReviews);
            expect(Review.findAll).toHaveBeenCalledWith({ where: { forestId: '1' } });
        });

        it('should return 500 if fetching reviews fails', async () => {
            Review.findAll.mockRejectedValue(new Error('Failed to fetch reviews'));

            const response = await request(app).get('/review/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch reviews' });
        });
    });
});