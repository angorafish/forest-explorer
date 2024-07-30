const request = require("supertest");
const express = require("express");
const { Notification, User } = require("../models");
const notificationRouter = require("../routes/notification");
const authenticateToken = require("../middleware/auth");

jest.mock("../middleware/auth");
jest.mock("../models");

const app = express();
app.use(express.json());
app.use(notificationRouter);

describe("Notification routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("should fetch notifications for the authenticated user", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      const mockNotifications = [
        { id: 1, content: "Notification 1", fromUser: { username: "user1" } },
      ];
      Notification.findAll.mockResolvedValue(mockNotifications);

      const response = await request(app)
        .get("/")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNotifications);
      expect(Notification.findAll).toHaveBeenCalledWith({
        where: { userId: 1 },
        include: [{ model: User, as: "fromUser", attributes: ["username"] }],
        order: [["createdAt", "DESC"]],
      });
    });

    it("should return 500 if fetching notifications fails", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Notification.findAll.mockRejectedValue(
        new Error("Failed to fetch notifications")
      );

      const response = await request(app)
        .get("/")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch notifications" });
    });
  });

  describe("PUT /:id/read", () => {
    it("should mark a notification as read for the authenticated user", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      const mockNotification = {
        id: 1,
        status: "unread",
        save: jest.fn().mockResolvedValue(true),
      };
      Notification.findByPk.mockResolvedValue(mockNotification);

      const response = await request(app)
        .put("/1/read")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNotification);
      expect(mockNotification.save).toHaveBeenCalled();
      expect(mockNotification.status).toBe("read");
    });

    it("should return 404 if the notification is not found", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Notification.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put("/1/read")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Notification not found" });
    });

    it("should return 403 if the user is not authorized to mark the notification as read", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 2 };
        next();
      });
      const mockNotification = { id: 1, userId: 1 };
      Notification.findByPk.mockResolvedValue(mockNotification);

      const response = await request(app)
        .put("/1/read")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(403);
      expect(response.body).toEqual({ error: "Unauthorized" });
    });

    it("should return 500 if marking the notification as read fails", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Notification.findByPk.mockRejectedValue(
        new Error("Failed to mark notification as read")
      );

      const response = await request(app)
        .put("/1/read")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to mark notification as read",
      });
    });
  });
});
