const axios = require("axios");
const { sequelize, Forest } = require("../models");
const fetchForestData = require("../scripts/fetchForestData");

jest.mock("axios");
jest.mock("../models");

describe("fetchForestData", () => {
  let originalConsoleError;

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should fetch and insert forest data correctly", async () => {
    const mockForests = {
      data: {
        features: [
          {
            attributes: {
              ADMINFORESTID: 1,
              REGION: "Region1",
              FORESTNUMBER: 123,
              FORESTORGCODE: "Code1",
              FORESTNAME: "Forest1",
              GIS_ACRES: 1000,
              SHAPE_Length: 200,
              SHAPE_Area: 300,
            },
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockForests);
    Forest.upsert.mockResolvedValue();

    await fetchForestData();

    expect(axios.get).toHaveBeenCalledWith(
      "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestSystemBoundaries_01/MapServer/0/query",
      {
        params: {
          where: "1=1",
          outFields: "*",
          f: "json",
        },
      }
    );

    expect(Forest.upsert).toHaveBeenCalledWith({
      adminForestId: 1,
      region: "Region1",
      forestNumber: 123,
      forestOrgCode: "Code1",
      name: "Forest1",
      gisAcres: 1000,
      shapeLength: 200,
      shapeArea: 300,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should handle non-array forest data", async () => {
    const mockForests = {
      data: {
        features: null,
      },
    };

    axios.get.mockResolvedValue(mockForests);

    await fetchForestData();

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching or inserting forest data:",
      expect.any(Error)
    );
  });

  it("should handle API errors", async () => {
    axios.get.mockRejectedValue(new Error("API error"));

    await fetchForestData();

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching or inserting forest data:",
      expect.any(Error)
    );
  });
});