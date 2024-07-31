const axios = require("axios");
const { Trail, sequelize } = require("../models");
const fetchTrailData = require("../scripts/fetchTrailData");

jest.mock("axios");
jest.mock("../models");

describe("fetchTrailData", () => {
  let originalConsoleLog;
  let originalConsoleError;

  beforeEach(() => {
    jest.clearAllMocks();
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  it("should fetch and insert trail data correctly", async () => {
    const mockTrailData = {
      features: [
        {
          attributes: {
            TRAIL_NO: "123",
            TRAIL_NAME: "Test Trail",
            TRAIL_TYPE: "Type1",
            SEGMENT_LENGTH: 10.5,
            MANAGING_ORG: "Org1",
            ACCESSIBILITY_STATUS: "Accessible",
            TRAIL_SURFACE: "Surface1",
            ALLOWED_TERRA_USE: "Use1",
            ALLOWED_SNOW_USE: "Use2",
            ALLOWED_WATER_USE: "Use3",
            TYPICAL_TRAIL_GRADE: "Grade1",
            TYPICAL_TREAD_WIDTH: "Width1",
          },
        },
      ],
    };

    axios.get.mockResolvedValue({ data: mockTrailData });
    sequelize.authenticate.mockResolvedValue();
    Trail.findOne.mockResolvedValue(null);
    Trail.create.mockResolvedValue();

    await fetchTrailData();

    expect(sequelize.authenticate).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0/query",
      {
        params: {
          where: "1=1",
          outFields: "*",
          f: "json",
        },
      }
    );
    expect(Trail.findOne).toHaveBeenCalledWith({
      where: { trailId: "123" },
    });
    expect(Trail.create).toHaveBeenCalledWith({
      trailId: "123",
      name: "Test Trail",
      type: "Type1",
      segmentLength: 10.5,
      managingOrg: "Org1",
      accessibilityStatus: "Accessible",
      trailSurface: "Surface1",
      allowedTerraUse: "Use1",
      allowedSnowUse: "Use2",
      allowedWaterUse: "Use3",
      typicalTrailGrade: "Grade1",
      typicalTreadWidth: "Width1",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(console.log).toHaveBeenCalledWith("Trail data has been successfully inserted.");
  });

  it("should handle non-array trail data", async () => {
    axios.get.mockResolvedValue({ data: { features: null } });
    sequelize.authenticate.mockResolvedValue();

    await fetchTrailData();

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching or inserting trail data:",
      new Error("Expected trail data to be an array.")
    );
  });

  it("should handle API errors", async () => {
    axios.get.mockRejectedValue(new Error("API error"));
    sequelize.authenticate.mockResolvedValue();

    await fetchTrailData();

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching or inserting trail data:",
      new Error("API error")
    );
  });

  it("should handle database insertion errors", async () => {
    const mockTrailData = {
      features: [
        {
          attributes: {
            TRAIL_NO: "123",
          },
        },
      ],
    };

    axios.get.mockResolvedValue({ data: mockTrailData });
    sequelize.authenticate.mockResolvedValue();
    Trail.findOne.mockResolvedValue(null);
    Trail.create.mockRejectedValue(new Error("Database error"));

    await fetchTrailData();

    expect(console.error).toHaveBeenCalledWith(
      "Error inserting trail data:",
      new Error("Database error")
    );
  });
});