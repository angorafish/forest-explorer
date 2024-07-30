const axios = require("axios");
const { sequelize, Forest } = require("../models");
const fetchForestData = require("../scripts/fetchForestData");

jest.mock("axios");
jest.mock("../models", () => ({
  sequelize: {
    authenticate: jest.fn(),
    close: jest.fn(),
  },
  Forest: {
    upsert: jest.fn(),
  },
}));

describe("fetchForestData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch forest data and upsert forests", async () => {
    const mockForests = {
      features: [
        {
          attributes: {
            ADMINFORESTID: 1,
            REGION: "Region 1",
            FORESTNUMBER: 123,
            FORESTORGCODE: "ORG123",
            FORESTNAME: "Test Forest",
            GIS_ACRES: 4567.89,
            SHAPE_Length: 123.45,
            SHAPE_Area: 678.9,
          },
        },
      ],
    };

    axios.get.mockResolvedValue({ data: mockForests });

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
    expect(Forest.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        adminForestId: 1,
        region: "Region 1",
        forestNumber: 123,
        forestOrgCode: "ORG123",
        name: "Test Forest",
        gisAcres: 4567.89,
        shapeLength: 123.45,
        shapeArea: 678.9,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
    expect(sequelize.close).toHaveBeenCalled();
  });

  it("should handle errors and close the sequelize connection", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch forests"));

    await fetchForestData();

    expect(axios.get).toHaveBeenCalled();
    expect(Forest.upsert).not.toHaveBeenCalled();
    expect(sequelize.close).toHaveBeenCalled();
  });
});
