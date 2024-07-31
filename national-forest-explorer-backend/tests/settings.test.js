const request = require("supertest");
const bcrypt = require("bcrypt");
const { app } = require("../index");
const { User } = require("../models");
const authenticateToken = require("../middleware/auth");

jest.mock("../models", () => ({
  User: {
    findByPk: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

jest.mock("../middleware/auth", () => jest.fn((req, res, next) => {
  req.user = { id: 1 };
  next();
}));

describe("Settings Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("PUT /api/settings", () => {
    it("should update user settings successfully", async () => {
      const mockUser = {
        id: 1,
        username: "oldUsername",
        email: "oldemail@example.com",
        save: jest.fn(),
      };

      User.findByPk.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue("hashedPassword");

      const res = await request(app)
        .put("/api/settings")
        .send({ username: "newUsername", email: "newemail@example.com", password: "newPassword" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Settings updated successfully" });
      expect(mockUser.username).toBe("newUsername");
      expect(mockUser.email).toBe("newemail@example.com");
      expect(mockUser.passwordHash).toBe("hashedPassword");
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
      User.findByPk.mockResolvedValue(null);

      const res = await request(app).put("/api/settings").send({ username: "newUsername" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if an error occurs during update", async () => {
      User.findByPk.mockRejectedValue(new Error("Database error"));

      const res = await request(app).put("/api/settings").send({ username: "newUsername" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("DELETE /api/settings", () => {
    it("should delete the user account successfully", async () => {
      const mockUser = {
        id: 1,
        destroy: jest.fn(),
      };

      User.findByPk.mockResolvedValue(mockUser);

      const res = await request(app).delete("/api/settings");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Account deleted successfully" });
      expect(mockUser.destroy).toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
      User.findByPk.mockResolvedValue(null);

      const res = await request(app).delete("/api/settings");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if an error occurs during deletion", async () => {
      User.findByPk.mockRejectedValue(new Error("Database error"));

      const res = await request(app).delete("/api/settings");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Internal server error" });
    });
  });
});