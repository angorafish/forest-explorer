const request = require("supertest");
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { User, Notification } = require("../models");
const notificationRoutes = require("../routes/notification");
const authenticateToken = require("../middleware/auth");

jest.mock("../middleware/auth", () => jest.fn((req, res, next) => next()));

const app = express();
app.use(express.json());
app.use("/notifications", notificationRoutes);

describe("Notification Routes", () => {
  let sequelize;
  let user;
  let fromUser;
  let notification;

  beforeAll(async () => {
    sequelize = new Sequelize("sqlite::memory:", { logging: false });

    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize, modelName: "User" }
    );

    Notification.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fromUserId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "unread",
        },
      },
      { sequelize, modelName: "Notification", timestamps: true }
    );

    Notification.belongsTo(User, { foreignKey: "userId", as: "user" });
    Notification.belongsTo(User, { foreignKey: "fromUserId", as: "fromUser" });

    await sequelize.sync({ force: true });

    user = await User.create({ username: "testuser" });
    fromUser = await User.create({ username: "fromuser" });
    notification = await Notification.create({
      userId: user.id,
      fromUserId: fromUser.id,
      type: "message",
      content: "You have a new message",
      status: "unread",
    });
  });

  afterAll(async () => {
    if (sequelize) {
      await sequelize.close();
    }
  });

  test("should fetch notifications for the authenticated user", async () => {
    authenticateToken.mockImplementationOnce((req, res, next) => {
      req.user = { id: user.id };
      next();
    });

    const res = await request(app).get("/notifications");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject({
      userId: user.id,
      fromUserId: fromUser.id,
      type: "message",
      content: "You have a new message",
      status: "unread",
    });
  });

  test("should mark a notification as read", async () => {
    authenticateToken.mockImplementationOnce((req, res, next) => {
      req.user = { id: user.id };
      next();
    });

    const res = await request(app).put(`/notifications/${notification.id}/read`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: notification.id,
      status: "read",
    });

    const updatedNotification = await Notification.findByPk(notification.id);
    expect(updatedNotification.status).toBe("read");
  });

  test("should return 404 if notification not found", async () => {
    authenticateToken.mockImplementationOnce((req, res, next) => {
      req.user = { id: user.id };
      next();
    });

    const res = await request(app).put("/notifications/999/read");

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: "Notification not found" });
  });

  test("should return 403 if user is not authorized", async () => {
    authenticateToken.mockImplementationOnce((req, res, next) => {
      req.user = { id: fromUser.id };
      next();
    });

    const res = await request(app).put(`/notifications/${notification.id}/read`);

    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ error: "Unauthorized" });
  });
});