const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../index");
const { User, Post, FriendRequest, Notification, Photo } = require("../models");

jest.mock("../models");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /username/:username", () => {
    it("should fetch user profile by username", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        sentRequests: [],
        receivedRequests: [],
        posts: [],
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app)
        .get("/user/username/testuser")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it("should return 404 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get("/user/username/testuser")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if fetching user profile fails", async () => {
      User.findOne.mockRejectedValue(new Error("Failed to fetch user profile"));

      const response = await request(app)
        .get("/user/username/testuser")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("GET /profile/:username", () => {
    it("should fetch user profile with posts by username", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        posts: [],
        sentRequests: [],
        receivedRequests: [],
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app)
        .get("/user/profile/testuser")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it("should return 404 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get("/user/profile/testuser")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if fetching user profile fails", async () => {
      User.findOne.mockRejectedValue(new Error("Failed to fetch user profile"));

      const response = await request(app)
        .get("/user/profile/testuser")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("PUT /:username/photos", () => {
    it("should update user photos", async () => {
      const mockUser = { id: 1, username: "testuser", save: jest.fn() };
      User.findOne.mockResolvedValue(mockUser);
      const mockPhoto = { create: jest.fn() };
      const mockNotification = { create: jest.fn() };
      Photo.create.mockResolvedValue(mockPhoto);
      Notification.create.mockResolvedValue(mockNotification);

      const response = await request(app)
        .put("/user/testuser/photos")
        .set("Authorization", "Bearer token")
        .attach("profilePhoto", "path/to/profilePhoto.jpg")
        .attach("coverPhoto", "path/to/coverPhoto.jpg");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(mockUser.save).toHaveBeenCalled();
      expect(Photo.create).toHaveBeenCalled();
      expect(Notification.create).toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put("/user/testuser/photos")
        .set("Authorization", "Bearer token")
        .attach("profilePhoto", "path/to/profilePhoto.jpg")
        .attach("coverPhoto", "path/to/coverPhoto.jpg");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if updating photos fails", async () => {
      User.findOne.mockRejectedValue(new Error("Failed to update photos"));

      const response = await request(app)
        .put("/user/testuser/photos")
        .set("Authorization", "Bearer token")
        .attach("profilePhoto", "path/to/profilePhoto.jpg")
        .attach("coverPhoto", "path/to/coverPhoto.jpg");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.create.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/user/register")
        .send({
          username: "testuser",
          email: "test@example.com",
          password: "password",
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "testuser",
          email: "test@example.com",
        })
      );
    });

    it("should return 500 if registering user fails", async () => {
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.create.mockRejectedValue(new Error("Failed to register user"));

      const response = await request(app)
        .post("/user/register")
        .send({
          username: "testuser",
          email: "test@example.com",
          password: "password",
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("POST /login", () => {
    it("should login a user", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        passwordHash: "hashedpassword",
      };
      bcrypt.compare.mockResolvedValue(true);
      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue("token");

      const response = await request(app)
        .post("/user/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: "token" });
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedpassword");
    });

    it("should return 401 if credentials are invalid", async () => {
      bcrypt.compare.mockResolvedValue(false);
      User.findOne.mockResolvedValue({ passwordHash: "hashedpassword" });

      const response = await request(app)
        .post("/user/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Invalid email or password" });
    });

    it("should return 500 if logging in user fails", async () => {
      User.findOne.mockRejectedValue(new Error("Failed to login user"));

      const response = await request(app)
        .post("/user/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });
});
