const request = require("supertest");
const express = require("express");
const trailRouter = require("../routes/trail");
const trailService = require("../services/trailService");

jest.mock("../services/trailService");

const app = express();
app.use(express.json());
app.use("/api/trails", trailRouter);

describe("Trail Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all trails successfully", async () => {
    const mockTrails = [
      { id: 1, name: "Trail 1", location: "Location 1" },
      { id: 2, name: "Trail 2", location: "Location 2" },
    ];

    trailService.getAllTrails.mockResolvedValue(mockTrails);

    const res = await request(app).get("/api/trails");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockTrails);
    expect(trailService.getAllTrails).toHaveBeenCalled();
  });

  it("should handle errors when fetching trails", async () => {
    trailService.getAllTrails.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/trails");

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: "Failed to fetch trails" });
    expect(trailService.getAllTrails).toHaveBeenCalled();
  });
});