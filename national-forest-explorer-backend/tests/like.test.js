const request = require("supertest");
const { app, sequelize } = require("../index");
const { Like, Post, Notification, User } = require("../models");
const authenticateToken = require("../middleware/auth");

jest.mock("../models");
jest.mock("../middleware/auth");

describe("Like Routes", () => {
  let user, post;

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(async () => {
    user = {
      id: 1,
      username: "testuser",
      email: "testuser@example.com",
      passwordHash: "hashedPassword",
    };

    post = {
      id: 1,
      postType: "review",
      location: "Test Location",
      rating: 5,
      reviewText: "Great place!",
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    User.findByPk.mockResolvedValue(user);
    Post.findByPk.mockResolvedValue(post);
    authenticateToken.mockImplementation((req, res, next) => {
      req.user = user;
      next();
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/likes/:postId", () => {
    it("should like a post successfully", async () => {
      Like.findOne.mockResolvedValue(null);
      Like.create.mockResolvedValue({
        id: 1,
        postId: post.id,
        userId: user.id,
      });
      Notification.create.mockResolvedValue();

      const res = await request(app)
        .post(`/api/likes/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("postId", post.id);
      expect(res.body).toHaveProperty("userId", user.id);
      expect(Like.create).toHaveBeenCalledWith({ postId: post.id, userId: user.id });
      expect(Notification.create).toHaveBeenCalledWith({
        userId: post.userId,
        fromUserId: user.id,
        type: "like",
      });
    });

    it("should return 404 if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .post(`/api/likes/999`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Post not found");
    });

    it("should return 400 if the post is already liked", async () => {
      Like.findOne.mockResolvedValue({ id: 1, postId: post.id, userId: user.id });

      const res = await request(app)
        .post(`/api/likes/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "You already liked this post");
    });

    it("should handle errors and return 500", async () => {
      Like.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app)
        .post(`/api/likes/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("message", "Failed to like post");
    });
  });

  describe("DELETE /api/likes/:postId", () => {
    it("should unlike a post successfully", async () => {
      const mockLike = {
        id: 1,
        postId: post.id,
        userId: user.id,
        destroy: jest.fn().mockResolvedValue(),
      };
      Like.findOne.mockResolvedValue(mockLike);

      const res = await request(app)
        .delete(`/api/likes/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Post unliked successfully");
      expect(Like.findOne).toHaveBeenCalledWith({ where: { postId: post.id, userId: user.id } });
      expect(mockLike.destroy).toHaveBeenCalled();
    });

    it("should return 404 if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .delete(`/api/likes/999`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Post not found");
    });

    it("should return 400 if the post is not liked", async () => {
      Like.findOne.mockResolvedValue(null);

      const res = await request(app)
        .delete(`/api/likes/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "You have not liked this post");
    });

    it("should handle errors and return 500", async () => {
      Like.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app)
        .delete(`/api/likes/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("message", "Failed to unlike post");
    });
  });
});