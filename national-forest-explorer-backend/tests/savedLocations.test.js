const request = require("supertest");
const { app, sequelize } = require("../index");
const { SavedLocation, Forest, Trail } = require("../models");

jest.mock("../middleware/auth", () => (req, res, next) => {
  req.user = { id: 1 };
  next();
});

describe("Saved Locations routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/savedLocations/save", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      jest.spyOn(SavedLocation, 'create').mockResolvedValue({
        id: 1,
        userId: 1,
        locationId: 1,
        locationType: "forest",
      });
    });

    it("should save a location", async () => {
      const response = await request(app)
        .post("/api/savedLocations/save")
        .send({
          userId: 1,
          locationId: 1,
          locationType: "forest",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: 1,
        userId: 1,
        locationId: 1,
        locationType: "forest",
      }));
      expect(SavedLocation.create).toHaveBeenCalledWith({
        userId: 1,
        locationId: 1,
        locationType: "forest",
      });
    });

    it("should return 500 if saving the location fails", async () => {
      SavedLocation.create.mockRejectedValue(new Error("Failed to save location"));

      const response = await request(app)
        .post("/api/savedLocations/save")
        .send({
          userId: 1,
          locationId: 1,
          locationType: "forest",
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("DELETE /api/savedLocations/unsave", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      jest.spyOn(SavedLocation, 'destroy').mockResolvedValue(1); // 1 indicates a successful deletion
    });

    it("should unsave a location", async () => {
      const response = await request(app)
        .delete("/api/savedLocations/unsave")
        .send({
          userId: 1,
          locationId: 1,
          locationType: "forest",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
      expect(SavedLocation.destroy).toHaveBeenCalledWith({
        where: { userId: 1, locationId: 1, locationType: "forest" },
      });
    });

    it("should return 500 if unsaving the location fails", async () => {
      SavedLocation.destroy.mockRejectedValue(new Error("Failed to unsave location"));

      const response = await request(app)
        .delete("/api/savedLocations/unsave")
        .send({
          userId: 1,
          locationId: 1,
          locationType: "forest",
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});