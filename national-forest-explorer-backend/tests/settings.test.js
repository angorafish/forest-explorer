const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../index");
const { User } = require("../models");

jest.mock("../models");
jest.mock("bcrypt");

describe("Settings Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("PUT /", () => {
    it("should update user settings", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        save: jest.fn(),
      };
      User.findByPk.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue("hashedpassword");

      const response = await request(app)
        .put("/settings")
        .send({
          username: "newuser",
          email: "new@example.com",
          password: "newpassword",
        })
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Settings updated successfully",
      });
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
      User.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put("/settings")
        .send({
          username: "newuser",
          email: "new@example.com",
          password: "newpassword",
        })
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if updating settings fails", async () => {
      User.findByPk.mockRejectedValue(new Error("Failed to update settings"));

      const response = await request(app)
        .put("/settings")
        .send({
          username: "newuser",
          email: "new@example.com",
          password: "newpassword",
        })
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });

  describe("DELETE /", () => {
    it("should delete user account", async () => {
      const mockUser = { id: 1, destroy: jest.fn() };
      User.findByPk.mockResolvedValue(mockUser);

      const response = await request(app)
        .delete("/settings")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Account deleted successfully",
      });
      expect(mockUser.destroy).toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
      User.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete("/settings")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if deleting account fails", async () => {
      User.findByPk.mockRejectedValue(new Error("Failed to delete account"));

      const response = await request(app)
        .delete("/settings")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });
  });
});
