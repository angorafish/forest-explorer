const request = require("supertest");
const app = require("../index");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

jest.mock("../models");
jest.mock("jsonwebtoken");

describe("Auth Routes", () => {
  let token;

  beforeEach(() => {
    token = "mockToken";
    jwt.sign.mockReturnValue(token);
    jwt.verify.mockImplementation((token, secret, callback) =>
      callback(null, { id: 1 })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/signup", () => {
    it("should sign up a user", async () => {
      User.create.mockResolvedValue({
        id: 1,
        username: "testuser",
        email: "testuser@example.com",
      });

      const res = await request(app).post("/auth/signup").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
    });

    it("should not sign up a user with invalid email", async () => {
      const res = await request(app).post("/auth/signup").send({
        username: "testuser",
        email: "invalidemail",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error", "Invalid email format");
    });

    it("should not sign up a user with invalid password", async () => {
      const res = await request(app).post("/auth/signup").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number."
      );
    });
  });

  describe("POST /auth/login", () => {
    it("should log in a user", async () => {
      User.findOne.mockResolvedValue({
        id: 1,
        username: "testuser",
        passwordHash: await bcrypt.hash("Password123", 10),
      });

      const res = await request(app).post("/auth/login").send({
        username: "testuser",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
    });

    it("should return error for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/auth/login").send({
        username: "invaliduser",
        password: "InvalidPassword",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });
  });

  describe("GET /auth/verify", () => {
    it("should verify token", async () => {
      const res = await request(app)
        .get("/auth/verify")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Token is valid");
    });
  });

  describe("GET /auth/me", () => {
    it("should fetch user details", async () => {
      User.findByPk.mockResolvedValue({
        id: 1,
        username: "testuser",
        email: "testuser@example.com",
      });

      const res = await request(app)
        .get("/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("username", "testuser");
    });

    it("should return error if user not found", async () => {
      User.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .get("/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "User not found.");
    });
  });
});
