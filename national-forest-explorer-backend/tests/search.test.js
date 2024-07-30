const request = require("supertest");
const app = require("../index");
const { Campsite, Forest, Trail } = require("../models");

jest.mock("../models");

describe("Search Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /suggestions", () => {
    it("should fetch search suggestions", async () => {
      const mockCampsites = [{ name: "Campsite1" }];
      const mockForests = [{ name: "Forest1" }];
      const mockTrails = [{ name: "Trail1" }];
      Campsite.findAll.mockResolvedValue(mockCampsites);
      Forest.findAll.mockResolvedValue(mockForests);
      Trail.findAll.mockResolvedValue(mockTrails);

      const response = await request(app)
        .get("/search/suggestions")
        .query({ q: "test" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(["Campsite1", "Forest1", "Trail1"]);
    });

    it("should return 500 if fetching suggestions fails", async () => {
      Campsite.findAll.mockRejectedValue(
        new Error("Failed to fetch suggestions")
      );

      const response = await request(app)
        .get("/search/suggestions")
        .query({ q: "test" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("GET /", () => {
    it("should fetch search results", async () => {
      const mockCampsites = [
        { id: 1, name: "Campsite1", state: "CA", forest: "Forest1" },
      ];
      const mockForests = [{ id: 1, name: "Forest1", state: "CA" }];
      const mockTrails = [
        { id: 1, name: "Trail1", state: "CA", forest: "Forest1" },
      ];
      Campsite.findAll.mockResolvedValue(mockCampsites);
      Forest.findAll.mockResolvedValue(mockForests);
      Trail.findAll.mockResolvedValue(mockTrails);

      const response = await request(app).get("/search").query({ q: "test" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 1,
          name: "Campsite1",
          type: "Campsite",
          state: "CA",
          forest: "Forest1",
        },
        {
          id: 1,
          name: "Forest1",
          type: "Forest",
          state: "CA",
          forest: "Forest1",
        },
        {
          id: 1,
          name: "Trail1",
          type: "Trail",
          state: "CA",
          forest: "Forest1",
        },
      ]);
    });

    it("should return 500 if fetching search results fails", async () => {
      Campsite.findAll.mockRejectedValue(
        new Error("Failed to fetch search results")
      );

      const response = await request(app).get("/search").query({ q: "test" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("GET /details/:id", () => {
    it("should fetch details by ID", async () => {
      const mockCampsite = { id: 1, name: "Campsite1" };
      Campsite.findByPk.mockResolvedValue(mockCampsite);

      const response = await request(app).get("/search/details/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCampsite);
    });

    it("should return 404 if details are not found", async () => {
      Campsite.findByPk.mockResolvedValue(null);

      const response = await request(app).get("/search/details/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Not found" });
    });

    it("should return 500 if fetching details fails", async () => {
      Campsite.findByPk.mockRejectedValue(new Error("Failed to fetch details"));

      const response = await request(app).get("/search/details/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});
