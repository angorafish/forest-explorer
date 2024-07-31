const request = require("supertest");
const express = require("express");
const { Photo, Post } = require("../models");
const photoRouter = require("../routes/photo");
const authenticateToken = require("../middleware/auth");
const multer = require("multer");

jest.mock("../middleware/auth");
jest.mock("../models");

// Mocking multer
jest.mock("multer", () => {
  const multer = jest.fn(() => {
    return {
      array: jest.fn().mockImplementation((fieldName) => (req, res, next) => {
        req.files = [
          { path: "uploads/photo1.jpg", filename: "photo1.jpg" },
          { path: "uploads/photo2.jpg", filename: "photo2.jpg" }
        ];
        next();
      }),
    };
  });
  multer.diskStorage = jest.fn();
  return multer;
});

const app = express();
app.use(express.json());
app.use("/photos", photoRouter);

describe("Photo routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /photos/user/:userId", () => {
    it("should fetch photos for a specific user", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      const mockPhotos = [{ id: 1, url: "photo1.jpg" }];
      Photo.findAll.mockResolvedValue(mockPhotos);

      const response = await request(app)
        .get("/photos/user/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPhotos);
      expect(Photo.findAll).toHaveBeenCalledWith({ where: { userId: "1" } });
    });

    it("should return 500 if fetching photos fails", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Photo.findAll.mockRejectedValue(new Error("Failed to fetch photos"));

      const response = await request(app)
        .get("/photos/user/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch photos" });
    });
  });

  describe("GET /photos/post/:postId", () => {
    it("should fetch photos for a specific post", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      const mockPhotos = [{ id: 1, url: "photo1.jpg" }];
      Photo.findAll.mockResolvedValue(mockPhotos);

      const response = await request(app)
        .get("/photos/post/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPhotos);
      expect(Photo.findAll).toHaveBeenCalledWith({ where: { postId: "1" } });
    });

    it("should return 500 if fetching photos fails", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Photo.findAll.mockRejectedValue(new Error("Failed to fetch photos"));

      const response = await request(app)
        .get("/photos/post/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch photos" });
    });
  });

  describe("POST /photos", () => {
    beforeEach(() => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
    });

    it("should return 500 if creating a post with photos fails", async () => {
      Post.create.mockRejectedValue(new Error("Failed to create post"));

      const response = await request(app)
        .post("/photos")
        .field("postType", "trail")
        .field("location", "Forest")
        .field("rating", 5)
        .field("reviewText", "Great!")
        .attach("photos", Buffer.from("dummy content"), "photo1.jpg")
        .attach("photos", Buffer.from("dummy content"), "photo2.jpg")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to create post" });
    });
  });

  describe("DELETE /photos/:id", () => {
    it("should delete a specific photo by ID", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      const mockPhoto = { id: 1, userId: 1, destroy: jest.fn() };
      Photo.findByPk.mockResolvedValue(mockPhoto);

      const response = await request(app)
        .delete("/photos/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Photo deleted successfully" });
      expect(mockPhoto.destroy).toHaveBeenCalled();
    });

    it("should return 404 if the photo is not found", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Photo.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete("/photos/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Photo not found" });
    });

    it("should return 403 if the user is not authorized to delete the photo", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 2 };
        next();
      });
      const mockPhoto = { id: 1, userId: 1 };
      Photo.findByPk.mockResolvedValue(mockPhoto);

      const response = await request(app)
        .delete("/photos/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(403);
      expect(response.body).toEqual({ error: "Unauthorized" });
    });

    it("should return 500 if deleting the photo fails", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
      Photo.findByPk.mockRejectedValue(new Error("Failed to delete photo"));

      const response = await request(app)
        .delete("/photos/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to delete photo" });
    });
  });
});