const request = require("supertest");
const { app, sequelize } = require("../index");
const { Review } = require("../models");

jest.mock("../middleware/auth", () => (req, res, next) => {
  req.user = { id: 1 }; 
  next();
});

describe("Review routes", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/reviews", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new review", async () => {
      const mockReview = {
        id: 1,
        userId: 1,
        postId: 1,
        forestId: 1,
        trailId: null,
        rating: 5,
        comment: "Great forest!",
      };

      Review.create = jest.fn().mockResolvedValue(mockReview);

      const response = await request(app)
        .post("/api/reviews")
        .send({
          forestId: 1,
          trailId: null,
          rating: 5,
          comment: "Great forest!",
          postId: 1,
        })
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(mockReview));
      expect(Review.create).toHaveBeenCalledWith(expect.objectContaining({
        userId: 1,
        forestId: 1,
        trailId: null,
        rating: 5,
        comment: "Great forest!",
        postId: 1,
      }));
    });

    it("should return 500 if creating the review fails", async () => {
      Review.create = jest.fn().mockRejectedValue(new Error("Failed to create review"));

      const response = await request(app)
        .post("/api/reviews")
        .send({
          forestId: 1,
          trailId: null,
          rating: 5,
          comment: "Great forest!",
          postId: 1,
        })
        .set("Authorization", "Bearer token");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to create review" });
    });
  });

  describe("GET /api/reviews/:locationId", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch reviews for a specific location", async () => {
      const mockReviews = [
        {
          id: 1,
          userId: 1,
          postId: 1,
          forestId: 1,
          trailId: null,
          rating: 5,
          comment: "Great forest!",
        },
      ];

      Review.findAll = jest.fn().mockResolvedValue(mockReviews);

      const response = await request(app).get("/api/reviews/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining(mockReviews));
      expect(Review.findAll).toHaveBeenCalledWith({ where: { forestId: "1" } });
    });

    it("should return 500 if fetching reviews fails", async () => {
      Review.findAll = jest.fn().mockRejectedValue(new Error("Failed to fetch reviews"));

      const response = await request(app).get("/api/reviews/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch reviews" });
    });
  });
});
