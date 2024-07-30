const request = require("supertest");
const app = require("../index");
const { SavedLocation, Forest, Trail, Campsite } = require("../models");

jest.mock("../models");

describe("Saved Locations Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user/:userId", () => {
    it("should fetch saved locations for a user", async () => {
      const mockSavedLocations = [
        { id: 1, locationId: 1, locationType: "forest" },
      ];
      const mockForest = { id: 1, name: "Test Forest" };
      SavedLocation.findAll.mockResolvedValue(mockSavedLocations);
      Forest.findByPk.mockResolvedValue(mockForest);

      const response = await request(app).get("/savedLocations/user/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { ...mockSavedLocations[0], name: mockForest.name },
      ]);
      expect(SavedLocation.findAll).toHaveBeenCalledWith({
        where: { userId: "1" },
      });
    });

    it("should return 500 if fetching saved locations fails", async () => {
      SavedLocation.findAll.mockRejectedValue(
        new Error("Failed to fetch saved locations")
      );

      const response = await request(app).get("/savedLocations/user/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("POST /save", () => {
    it("should save a new location", async () => {
      const mockSavedLocation = {
        id: 1,
        userId: 1,
        locationId: 1,
        locationType: "forest",
      };
      SavedLocation.create.mockResolvedValue(mockSavedLocation);

      const response = await request(app)
        .post("/savedLocations/save")
        .send({ userId: 1, locationId: 1, locationType: "forest" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSavedLocation);
      expect(SavedLocation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 1,
          locationId: 1,
          locationType: "forest",
        })
      );
    });

    it("should return 500 if saving a location fails", async () => {
      SavedLocation.create.mockRejectedValue(
        new Error("Failed to save location")
      );

      const response = await request(app)
        .post("/savedLocations/save")
        .send({ userId: 1, locationId: 1, locationType: "forest" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("DELETE /unsave", () => {
    it("should unsave a location", async () => {
      SavedLocation.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete("/savedLocations/unsave")
        .send({ userId: 1, locationId: 1, locationType: "forest" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
      expect(SavedLocation.destroy).toHaveBeenCalledWith({
        where: { userId: 1, locationId: 1, locationType: "forest" },
      });
    });

    it("should return 500 if unsaving a location fails", async () => {
      SavedLocation.destroy.mockRejectedValue(
        new Error("Failed to unsave location")
      );

      const response = await request(app)
        .delete("/savedLocations/unsave")
        .send({ userId: 1, locationId: 1, locationType: "forest" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});
