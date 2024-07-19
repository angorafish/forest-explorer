const request = require('supertest');
const express = require('express');
const { FriendRequest, Notification } = require('../models');
const friendRequestRouter = require('../routes/friendRequest');
const authenticateToken = require('../middleware/auth');
const { io } = require('../index');

jest.mock('../middleware/auth');
jest.mock('../models');
jest.mock('../index', () => ({
    io: { to: jest.fn().mockReturnValue({ emit: jest.fn() }) }
}));

const app = express();
app.use(express.json());
app.use(friendRequestRouter);

describe('FriendRequest routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /', () => {
        it('should send a friend request', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            FriendRequest.findOne.mockResolvedValue(null);
            FriendRequest.create.mockResolvedValue({ id: 1, status: 'pending' });
            Notification.create.mockResolvedValue({});

            const response = await request(app)
                .post('/')
                .send({ receiverId: 2 })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id: 1, status: 'pending' });
            expect(FriendRequest.create).toHaveBeenCalledWith({
                requesterId: 1,
                receiverId: 2,
                status: 'pending'
            });
            expect(io.to).toHaveBeenCalledWith('2');
            expect(io.to().emit).toHaveBeenCalledWith('new_notification', {
                type: 'friend_request',
                notification: expect.any(Object),
                friendRequest: { id: 1, status: 'pending' }
            });
        });

        it('should return 500 if sending a friend request fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 1 };
                next();
            });
            FriendRequest.create.mockRejectedValue(new Error('Failed to send friend request'));

            const response = await request(app)
                .post('/')
                .send({ receiverId: 2 })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Internal server error' });
        });
    });

    describe('PUT /:id/accept', () => {
        it('should accept a friend request', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 2 };
                next();
            });
            const mockFriendRequest = { id: 1, receiverId: 2, status: 'pending', save: jest.fn() };
            FriendRequest.findByPk.mockResolvedValue(mockFriendRequest);
            Notification.create.mockResolvedValue({});

            const response = await request(app)
                .put('/1/accept')
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, receiverId: 2, status: 'accepted', save: expect.any(Function) });
            expect(mockFriendRequest.save).toHaveBeenCalled();
            expect(io.to).toHaveBeenCalledWith('1');
            expect(io.to().emit).toHaveBeenCalledWith('new_notification', {
                type: 'friend_accept',
                notification: expect.any(Object)
            });
        });

        it('should return 500 if accepting a friend request fails', async () => {
            authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 2 };
                next();
            });
            FriendRequest.findByPk.mockRejectedValue(new Error('Failed to accept friend request'));

            const response = await request(app)
                .put('/1/accept')
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Internal server error' });
        });
    });
});