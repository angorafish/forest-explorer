const request = require("supertest");
const { app, sequelize } = require("../index");
const { Forest, Trail, Post, User } = require("../models");
const setupTestDB = require("./setup");

jest.mock("../models");

describe("Details Routes", () => {
  let forest;
  let trail;
  let post;
  let user;

  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    User.create.mockResolvedValue({
      id: 1,
      username: "testuser",
      email: "testuser@example.com",
      passwordHash: "hashedPassword",
    });

    Forest.create.mockResolvedValue({
      id: 1,
      adminForestId: "123",
      region: "West",
      forestNumber: 456,
      forestOrgCode: "789",
      name: "Test Forest",
      gisAcres: 1000,
      shapeLength: 2000,
      shapeArea: 3000,
    });

    Trail.create.mockResolvedValue({
      id: 1,
      name: "Test Trail",
      state: "CA",
      forest: "Test Forest",
      segmentLength: 5.0,
      trailSurface: "Dirt",
      managingOrg: "Forest Service",
      accessibilityStatus: "Open",
      allowedTerraUse: "Hiking",
      allowedSnowUse: "None",
      allowedWaterUse: "None",
      typicalTrailGrade: "5%",
      typicalTreadWidth: "2 feet",
      type: "trail",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    Post.create.mockResolvedValue({
      id: 1,
      postType: "review",
      location: "Test Location",
      rating: 5,
      reviewText: "Great place!",
      userId: 1,
      forestId: 1,
      trailId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
      passwordHash: "hashedPassword",
    });

    forest = await Forest.create({
      id: 1,
      adminForestId: "123",
      region: "West",
      forestNumber: 456,
      forestOrgCode: "789",
      name: "Test Forest",
      gisAcres: 1000,
      shapeLength: 2000,
      shapeArea: 3000,
    });

    trail = await Trail.create({
      id: 1,
      name: "Test Trail",
      state: "CA",
      forest: "Test Forest",
      segmentLength: 5.0,
      trailSurface: "Dirt",
      managingOrg: "Forest Service",
      accessibilityStatus: "Open",
      allowedTerraUse: "Hiking",
      allowedSnowUse: "None",
      allowedWaterUse: "None",
      typicalTrailGrade: "5%",
      typicalTreadWidth: "2 feet",
      type: "trail",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    post = await Post.create({
      postType: "review",
      location: "Test Location",
      rating: 5,
      reviewText: "Great place!",
      userId: user.id,
      forestId: forest.id,
      trailId: trail.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  afterEach(async () => {
    await User.destroy.mockResolvedValue({});
    await Forest.destroy.mockResolvedValue({});
    await Trail.destroy.mockResolvedValue({});
    await Post.destroy.mockResolvedValue({});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/details/forests/:id", () => {
    it("should fetch details of a specific forest", async () => {
      Forest.findByPk.mockResolvedValue({
        id: 1,
        adminForestId: "123",
        region: "West",
        forestNumber: 456,
        forestOrgCode: "789",
        name: "Test Forest",
        gisAcres: 1000,
        shapeLength: 2000,
        shapeArea: 3000,
        posts: [post],
      });

      const res = await request(app).get(`/api/details/forests/${forest.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Test Forest");
      expect(res.body.posts).toHaveLength(1);
    });

    it("should return 404 if the forest is not found", async () => {
      Forest.findByPk.mockResolvedValue(null);

      const res = await request(app).get(`/api/details/forests/999`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Forest not found");
    });

    it("should return 500 if there is an internal server error", async () => {
      Forest.findByPk.mockRejectedValue(new Error("Database error"));
      const res = await request(app).get(`/api/details/forests/${forest.id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("error", "Internal server error");
    });
  });

  describe("GET /api/details/trails/:id", () => {
    it("should fetch details of a specific trail", async () => {
      Trail.findByPk.mockResolvedValue({
        id: 1,
        name: "Test Trail",
        state: "CA",
        forest: "Test Forest",
        segmentLength: 5.0,
        trailSurface: "Dirt",
        managingOrg: "Forest Service",
        accessibilityStatus: "Open",
        allowedTerraUse: "Hiking",
        allowedSnowUse: "None",
        allowedWaterUse: "None",
        typicalTrailGrade: "5%",
        typicalTreadWidth: "2 feet",
        type: "trail",
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [post],
      });

      const res = await request(app).get(`/api/details/trails/${trail.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Test Trail");
      expect(res.body.posts).toHaveLength(1);
    });

    it("should return 404 if the trail is not found", async () => {
      Trail.findByPk.mockResolvedValue(null);

      const res = await request(app).get(`/api/details/trails/999`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Trail not found");
    });

    it("should return 500 if there is an internal server error", async () => {
      Trail.findByPk.mockRejectedValue(new Error("Database error"));
      const res = await request(app).get(`/api/details/trails/${trail.id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("error", "Internal server error");
    });
  });

  describe("GET /api/details/posts/:id", () => {
    it("should fetch details of a specific post", async () => {
      Post.findByPk.mockResolvedValue({
        id: 1,
        postType: "review",
        location: "Test Location",
        rating: 5,
        reviewText: "Great place!",
        userId: user.id,
        forestId: forest.id,
        trailId: trail.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app).get(`/api/details/posts/${post.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("reviewText", "Great place!");
    });

    it("should return 404 if the post is not found", async () => {
      Post.findByPk.mockResolvedValue(null);

      const res = await request(app).get(`/api/details/posts/999`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Post not found");
    });

    it("should return 500 if there is an internal server error", async () => {
      Post.findByPk.mockRejectedValue(new Error("Database error"));
      const res = await request(app).get(`/api/details/posts/${post.id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("error", "Internal server error");
    });
  });
});