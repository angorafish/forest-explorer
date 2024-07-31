const request = require("supertest");
const { app, sequelize } = require("../index");
const { User, Post, Comment, Notification } = require("../models");
const setupTestDB = require("./setup");
const jwt = require("jsonwebtoken");

jest.mock("../models");

describe("Comment Routes", () => {
  let user;
  let post;

  beforeAll(async () => {
    await setupTestDB();
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

    User.create.mockResolvedValue(user);
    Post.create.mockResolvedValue(post);

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(null, { id: user.id });
    });

    jwt.sign = jest.fn(() => "mockToken");

    await User.create(user);
    await Post.create(post);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await User.destroy({ where: {} });
    await Post.destroy({ where: {} });
    await Comment.destroy({ where: {} });
    await Notification.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/comments/:postId", () => {
    it("should fetch comments for a specific post", async () => {
      Comment.findAll.mockResolvedValue([
        {
          id: 1,
          text: "Nice post!",
          userId: user.id,
          postId: post.id,
          user: { username: "testuser" },
        },
      ]);

      const res = await request(app)
        .get(`/api/comments/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("text", "Nice post!");
    });

    it("should return 500 if there is an internal server error", async () => {
      Comment.findAll.mockRejectedValue(new Error("Database error"));

      const res = await request(app)
        .get(`/api/comments/${post.id}`)
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch comments");
    });
  });

  describe("POST /api/comments", () => {
    it("should create a new comment", async () => {
      Post.findByPk.mockResolvedValue(post);
      Comment.create.mockResolvedValue({
        id: 1,
        text: "Nice post!",
        userId: user.id,
        postId: post.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const fullComment = {
        id: 1,
        text: "Nice post!",
        userId: user.id,
        postId: post.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { username: "testuser" },
      };

      Comment.findByPk.mockResolvedValue(fullComment);

      const res = await request(app)
        .post("/api/comments")
        .send({
          postId: post.id,
          text: "Nice post!",
        })
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("text", "Nice post!");
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("username", "testuser");
    });

    it("should return an error if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .post("/api/comments")
        .send({
          postId: 999,
          text: "Nice post!",
        })
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Post not found");
    });

    it("should return an error if creating comment fails", async () => {
      Post.findByPk.mockResolvedValue(post);
      Comment.create.mockRejectedValue(new Error("Database error"));

      const res = await request(app)
        .post("/api/comments")
        .send({
          postId: post.id,
          text: "Nice post!",
        })
        .set("Authorization", `Bearer mockToken`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("error", "Failed to create comment");
    });
  });
});