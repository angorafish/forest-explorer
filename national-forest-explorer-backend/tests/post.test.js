const request = require("supertest");
const express = require("express");
const { Post, User, Review, Comment, Like, Photo } = require("../models");
const postRouter = require("../routes/post");
const authenticateToken = require("../middleware/auth");
const multer = require("multer");

jest.mock("../middleware/auth");
jest.mock("../models");

jest.mock("multer", () => {
  const multer = jest.fn(() => {
    return {
      single: jest.fn().mockImplementation((fieldName) => (req, res, next) => {
        req.file = { path: "uploads/photo1.jpg", filename: "photo1.jpg" };
        next();
      }),
    };
  });
  multer.diskStorage = jest.fn();
  return multer;
});

const app = express();
app.use(express.json());
app.use("/posts", postRouter);

describe("Post routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /posts", () => {
    it("should fetch all posts", async () => {
      const mockPosts = [
        {
          id: 1,
          postType: "trail",
          location: "Forest",
          rating: 5,
          reviewText: "Great!",
          user: { username: "testuser" },
          reviews: [],
          comments: [],
          likes: [],
          photos: [],
        },
      ];
      Post.findAll.mockResolvedValue(mockPosts);

      const response = await request(app).get("/posts");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPosts);
      expect(Post.findAll).toHaveBeenCalledWith({
        include: expect.any(Array),
      });
    });

    it("should return 500 if fetching posts fails", async () => {
      Post.findAll.mockRejectedValue(new Error("Failed to fetch posts"));

      const response = await request(app).get("/posts");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch posts" });
    });
  });

  describe("GET /posts/:id", () => {
    it("should fetch a specific post by ID", async () => {
      const mockPost = {
        id: 1,
        postType: "trail",
        location: "Forest",
        rating: 5,
        reviewText: "Great!",
        user: { username: "testuser" },
        reviews: [],
        comments: [],
        likes: [],
        photos: [],
      };
      Post.findByPk.mockResolvedValue(mockPost);

      const response = await request(app).get("/posts/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPost);
      expect(Post.findByPk).toHaveBeenCalledWith("1", {
        include: expect.any(Array),
      });
    });

    it("should return 404 if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const response = await request(app).get("/posts/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Post not found" });
    });

    it("should return 500 if fetching the post fails", async () => {
      Post.findByPk.mockRejectedValue(new Error("Failed to fetch post"));

      const response = await request(app).get("/posts/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch post" });
    });
  });

  describe("POST /posts", () => {
    beforeEach(() => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
    });

    it("should return 500 if creating the post fails", async () => {
      Post.create.mockRejectedValue(new Error("Failed to create post"));

      const response = await request(app)
        .post("/posts")
        .field("postType", "trail")
        .field("location", "Forest")
        .field("rating", 5)
        .field("reviewText", "Great!")
        .attach("photo", Buffer.from("dummy content"), "photo1.jpg")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to create post" });
    });
  });

  describe("PUT /posts/:id", () => {
    beforeEach(() => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
    });

    it("should return 404 if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Post not found" });
    });

    it("should return 403 if the user is not authorized to update the post", async () => {
      const mockPost = { id: 1, userId: 2, save: jest.fn() };
      Post.findByPk.mockResolvedValue(mockPost);

      const response = await request(app)
        .put("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(403);
      expect(response.body).toEqual({ error: "Unauthorized" });
    });

    it("should return 500 if updating the post fails", async () => {
      Post.findByPk.mockRejectedValue(new Error("Failed to update post"));

      const response = await request(app)
        .put("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to update post" });
    });
  });

  describe("DELETE /posts/:id", () => {
    beforeEach(() => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { id: 1 };
        next();
      });
    });

    it("should delete a specific post by ID", async () => {
      const mockPost = {
        id: 1,
        userId: 1,
        destroy: jest.fn().mockResolvedValue(),
      };
      Post.findByPk.mockResolvedValue(mockPost);

      const response = await request(app)
        .delete("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Post deleted successfully" });
      expect(mockPost.destroy).toHaveBeenCalled();
    });

    it("should return 404 if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Post not found" });
    });

    it("should return 403 if the user is not authorized to delete the post", async () => {
      const mockPost = { id: 1, userId: 2, destroy: jest.fn() };
      Post.findByPk.mockResolvedValue(mockPost);

      const response = await request(app)
        .delete("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(403);
      expect(response.body).toEqual({ error: "Unauthorized" });
    });

    it("should return 500 if deleting the post fails", async () => {
      Post.findByPk.mockRejectedValue(new Error("Failed to delete post"));

      const response = await request(app)
        .delete("/posts/1")
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to delete post" });
    });
  });
});
