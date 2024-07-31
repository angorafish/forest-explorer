const request = require("supertest");
const express = require("express");
const path = require("path");
const userRouter = require("../routes/user");
const { User, Post, Review, Comment, Like, Notification, Photo } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/auth");

jest.mock("../models");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../middleware/auth", () => jest.fn((req, res, next) => {
  req.user = { id: 1 };
  next();
}));

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/users/user/:username", () => {
    it("should fetch a user's posts by username", async () => {
      const mockUser = { id: 1, username: "testuser" };
      const mockPosts = [{ id: 1, userId: 1, content: "Post content" }];

      User.findOne.mockResolvedValue(mockUser);
      Post.findAll.mockResolvedValue(mockPosts);

      const res = await request(app).get("/api/users/user/testuser");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockPosts);
      expect(User.findOne).toHaveBeenCalledWith({ where: { username: "testuser" } });
      expect(Post.findAll).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        include: expect.any(Array),
      });
    });

    it("should return 404 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).get("/api/users/user/testuser");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/api/users/user/testuser");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Failed to fetch posts" });
    });
  });

  describe("GET /api/users/profile/:username", () => {
    it("should fetch a user's profile by username", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        posts: [{ id: 1, content: "Post content", likes: [], comments: [], reviews: [] }],
      };

      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app).get("/api/users/profile/testuser");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "testuser" },
        include: expect.any(Array),
      });
    });

    it("should return 404 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).get("/api/users/profile/testuser");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/api/users/profile/testuser");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("PUT /api/users/:username/photos", () => {
    it("should update user's profile and cover photos", async () => {
      const mockUser = { id: 1, username: "testuser", save: jest.fn() };

      User.findOne.mockResolvedValue(mockUser);
      Photo.create.mockResolvedValue();
      Notification.create.mockResolvedValue();

      const res = await request(app)
        .put("/api/users/testuser/photos")
        .attach("profilePhoto", path.resolve(__dirname, "fixtures", "profile.jpg"))
        .attach("coverPhoto", path.resolve(__dirname, "fixtures", "cover.jpg"));

      expect(res.statusCode).toBe(200);
      expect(mockUser.save).toHaveBeenCalled();
      expect(Photo.create).toHaveBeenCalledTimes(4);
      expect(Notification.create).toHaveBeenCalledTimes(4);
    });

    it("should return 404 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).put("/api/users/testuser/photos");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app).put("/api/users/testuser/photos");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const mockUser = { id: 1, username: "testuser", email: "test@example.com" };
      bcrypt.hash.mockResolvedValue("hashedPassword");
      User.create.mockResolvedValue(mockUser);

      const res = await request(app)
        .post("/api/users/register")
        .send({ username: "testuser", email: "test@example.com", password: "password123" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockUser);
      expect(User.create).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        passwordHash: "hashedPassword",
      });
    });

    it("should return 500 if an error occurs during registration", async () => {
      bcrypt.hash.mockRejectedValue(new Error("Hash error"));

      const res = await request(app)
        .post("/api/users/register")
        .send({ username: "testuser", email: "test@example.com", password: "password123" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user and return a token", async () => {
      const mockUser = { id: 1, email: "test@example.com", passwordHash: "hashedPassword" };
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("fakeToken");
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ token: "fakeToken" });
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", mockUser.passwordHash);
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    });

    it("should return 401 for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ message: "Invalid email or password" });
    });

    it("should return 500 if an error occurs during login", async () => {
      User.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Internal server error" });
    });
  });
});
