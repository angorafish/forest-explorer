const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Defines the directory to store uploaded files
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  // Create the upload directory if it doesn't exist
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploaded files
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Set the filename format for uploaded files
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// Defines file filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."));
  }
};

// Configure multer with storage, file filter, and file size limit
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5mb
});

module.exports = upload;
