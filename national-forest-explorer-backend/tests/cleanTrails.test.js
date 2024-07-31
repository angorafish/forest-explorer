const { Trail } = require("../models");
const cleanTrails = require("../scripts/cleanTrails");

jest.mock("../models");

describe("cleanTrails", () => {
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

  it("should remove trails with no names", async () => {
    Trail.destroy.mockResolvedValue(5);

    await cleanTrails();

    expect(Trail.destroy).toHaveBeenCalledWith({
      where: {
        name: null,
      },
    });
    expect(console.log).toHaveBeenCalledWith("Removed 5 trails with no names.");
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Database error");
    Trail.destroy.mockRejectedValue(error);

    await cleanTrails();

    expect(console.error).toHaveBeenCalledWith("Error cleaning trails:", error);
  });
});