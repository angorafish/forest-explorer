const axios = require("axios");
const { sequelize, Campsite } = require("../models");
const fetchCampsiteData = require("../scripts/fetchCampsiteData");

jest.mock("axios");
jest.mock("../models", () => ({
  sequelize: {
    authenticate: jest.fn(),
    close: jest.fn(),
  },
  Campsite: {
    upsert: jest.fn(),
  },
}));

describe("fetchCampsiteData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.RIDB_API_KEY = "test_api_key";
  });

  it("should fetch campsite data and upsert campsites", async () => {
    const mockCampsites = {
      RECDATA: [
        {
          FacilityID: 1,
          CampsiteName: "Campsite 1",
          CampsiteType: "Tent",
          CampsiteLatitude: 34.0,
          CampsiteLongitude: -118.0,
          ENTITYMEDIA: [{ URL: "http://example.com/map1" }],
          FacilityPhone: "123-456-7890",
          FacilityEmail: "test@example.com",
          CampsiteDescription: "Description 1",
          FacilityUseFeeDescription: "Fee 1",
          CampsiteReservable: true,
          CampsiteAccessible: false,
        },
      ],
    };

    axios.get.mockResolvedValue({ data: mockCampsites });

    await fetchCampsiteData();

    expect(axios.get).toHaveBeenCalledWith(
      "https://ridb.recreation.gov/api/v1/campsites",
      {
        headers: { apikey: "test_api_key" },
        params: { limit: 500 },
      }
    );
    expect(Campsite.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        facilityId: 1,
        name: "Campsite 1",
        type: "Tent",
        latitude: 34.0,
        longitude: -118.0,
        mapUrl: "http://example.com/map1",
        phone: "123-456-7890",
        email: "test@example.com",
        description: "Description 1",
        useFeeDescription: "Fee 1",
        reservable: true,
        adaAccess: false,
      })
    );
    expect(sequelize.close).toHaveBeenCalled();
  });

  it("should handle errors and close the sequelize connection", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch campsites"));

    await fetchCampsiteData();

    expect(axios.get).toHaveBeenCalled();
    expect(Campsite.upsert).not.toHaveBeenCalled();
    expect(sequelize.close).toHaveBeenCalled();
  });
});
