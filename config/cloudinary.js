const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: file.mimetype === "application/pdf" ? "pdfs" : "snapshots",
      resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
      format: file.mimetype === "application/pdf" ? "pdf" : "jpg", // Change based on your needs
    };
  },
});

// Multer Upload Middleware
const upload = multer({ storage });

module.exports = { cloudinary, upload };
