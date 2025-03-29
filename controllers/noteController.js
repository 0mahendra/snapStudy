const Note = require("../model/noteModel");

// 📌 Create a new PDF with chapters
exports.createNote = async (req, res) => {
  const { pdfName, chapters } = req.body;
  try {
    const note = await Note.create({ user: req.user.id, pdfName, chapters });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Add a new snapshot to a specific chapter
exports.addSnapshot = async (req, res) => {
  const { noteId, chapterName, imageUrl, aiSummary } = req.body;
  try {
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const chapter = note.chapters.find((ch) => ch.chapterName === chapterName);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.snapshots.push({ imageUrl, aiSummary });
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Get all notes for a user
exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Update AI summary for a specific snapshot
exports.updateAISummary = async (req, res) => {
  const { noteId, chapterName, snapshotId, aiSummary } = req.body;
  try {
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const chapter = note.chapters.find((ch) => ch.chapterName === chapterName);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const snapshot = chapter.snapshots.id(snapshotId);
    if (!snapshot) return res.status(404).json({ message: "Snapshot not found" });

    snapshot.aiSummary = aiSummary;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
