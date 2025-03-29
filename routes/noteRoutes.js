const express = require("express");
const {
  createNote,
  addSnapshot,
  getUserNotes,
  updateAISummary,
} = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.post("/snapshot", authMiddleware, addSnapshot);
router.get("/", authMiddleware, getUserNotes);
router.put("/summary", authMiddleware, updateAISummary);

module.exports = router;
