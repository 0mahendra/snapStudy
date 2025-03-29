const express = require("express");
const { upload } = require("../config/cloudinary"); 
const router = express.Router();

// Upload Snapshot (Image)
router.post("/snapshot", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    console.error("Snapshot upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Upload PDF
router.post("/pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ pdfUrl: req.file.path });
  } catch (error) {
    console.error("PDF upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
