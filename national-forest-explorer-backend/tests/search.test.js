const request = require("supertest");
const { app } = require("../index");
const { Forest, Trail, Sequelize } = require("../models");
const { Op } = require("sequelize");

jest.mock("../models", () => ({
  Forest: {
    findAll: jest.fn(),
  },
  Trail: {
    findAll: jest.fn(),
  },
  Sequelize: {
    Op: jest.requireActual("sequelize").Op,
  },
}));

describe("Search Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/search/suggestions", () => {
    it("should return search suggestions for forests and trails", async () => {
      const mockForests = [{ id: 1, name: "Forest A" }];
      const mockTrails = [{ id: 2, name: "Trail B" }];

      Forest.findAll.mockResolvedValue(mockForests);
      Trail.findAll.mockResolvedValue(mockTrails);

      const res = await request(app).get("/api/search/suggestions?q=test");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { id: 1, name: "Forest A", type: "Forest" },
        { id: 2, name: "Trail B", type: "Trail" },
      ]);

      expect(Forest.findAll).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.iLike]: `%test%`,
          },
        },
      });

      expect(Trail.findAll).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.iLike]: `%test%`,
            [Op.not]: null,
          },
        },
      });
    });

    it("should return a 500 error if an exception occurs", async () => {
      Forest.findAll.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/api/search/suggestions?q=test");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("GET /api/search", () => {
    it("should return search results for forests and trails", async () => {
      const mockForests = [{ id: 1, name: "Forest A", region: "Region A", shapeArea: 100 }];
      const mockTrails = [{ id: 2, name: "Trail B", state: "State B", forest: "Forest A" }];

      Forest.findAll.mockResolvedValue(mockForests);
      Trail.findAll.mockResolvedValue(mockTrails);

      const res = await request(app).get("/api/search?q=test");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { id: 1, name: "Forest A", type: "Forest", region: "Region A", shapeArea: 100 },
        { id: 2, name: "Trail B", type: "Trail", state: "State B", forest: "Forest A" },
      ]);

      expect(Forest.findAll).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.iLike]: `%test%`,
          },
        },
      });

      expect(Trail.findAll).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.iLike]: `%test%`,
            [Op.not]: null,
          },
        },
      });
    });

    it("should return a 500 error if an exception occurs", async () => {
      Forest.findAll.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/api/search?q=test");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Internal server error" });
    });
  });
});
