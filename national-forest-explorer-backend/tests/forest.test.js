const request = require("supertest");
const express = require("express");
const forestRouter = require("../routes/forest");
const forestService = require("../services/forestService");

jest.mock("../services/forestService");

const app = express();
app.use(express.json());
app.use("/api/forests", forestRouter);

describe("Forest Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all forests successfully", async () => {
    const mockForests = [
      { id: 1, name: "Forest 1", region: "Region 1" },
      { id: 2, name: "Forest 2", region: "Region 2" },
    ];

    forestService.getAllForests.mockResolvedValue(mockForests);

    const res = await request(app).get("/api/forests");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockForests);
    expect(forestService.getAllForests).toHaveBeenCalled();
  });

  it("should handle errors when fetching forests", async () => {
    forestService.getAllForests.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/forests");

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: "Failed to fetch national forests data" });
    expect(forestService.getAllForests).toHaveBeenCalled();
  });
});