require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const forestRoutes = require("./routes/forest");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const reviewRouter = require("./routes/review");
const authenticateToken = require("./middleware/auth");
const commentRouter = require("./routes/comment");
const trailRouter = require("./routes/trail");
const settingsRouter = require("./routes/settings");
const notificationRouter = require("./routes/notification");
const likeRouter = require("./routes/like");
const errorHandler = require("./middleware/errorHandler");
const fs = require("fs");
const upload = require("./middleware/upload");
const http = require("http");
const socketIo = require("socket.io");
const photoRouter = require("./routes/photo");
const searchRouter = require("./routes/search");
const detailsRouter = require("./routes/details");
const savedLocationsRouter = require("./routes/savedLocations");

// Creates the express application
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, { // Setup socket.io with CORS config
  cors: {
    origin: process.env.FRONTEND_URL || "https://national-forest-frontend-5e04820d306c.herokuapp.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware setup
app.use(
  cors({
    origin: "https://national-forest-frontend-5e04820d306c.herokuapp.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies
app.use("/uploads", express.static(uploadDir)); // Serve static files from uploads directory

// API route setup
app.use("/api/forests", forestRoutes);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/comments", authenticateToken, commentRouter);
app.use("/api/trails", trailRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/notifications", authenticateToken, notificationRouter);
app.use("/api/likes", likeRouter);
app.use("/api/photos", photoRouter);
app.use("/api/search", searchRouter);
app.use("/api/details", detailsRouter);
app.use("/api/savedLocations", savedLocationsRouter);

// Serve a simple welcome message on the root route
app.get('/', (req, res) => {
  res.send('Welcome to the National Forest Explorer API!');
});

app.use(errorHandler); // Global error handler middleware

const PORT = process.env.PORT || 3000; // Define the port to run the server

// Drop forestId column from Trails table if it exists
const dropForestIdFromTrails = async () => {
  try {
    await sequelize.query(
      'ALTER TABLE "Trails" DROP COLUMN IF EXISTS "forestId";'
    );
    console.log("Dropped forestId column from Trails table if it existed.");
  } catch (error) {
    console.error("Error dropping forestId column:", error);
  }
};

// Function to synchronize the database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await dropForestIdFromTrails();
    await sequelize.sync({ alter: true });
    console.log("Database synchronized!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Start the server
const startServer = async () => {
  try {
    await syncDatabase();
    if (process.env.NODE_ENV !== "test") {
      server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer(); // Initialize the server

// Setup socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

module.exports = { app, server, sequelize, io };