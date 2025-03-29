const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pdfName: { type: String, required: true }, // Name of the PDF file
  chapters: [
    {
      chapterName: { type: String, required: true }, // Name of the chapter
      snapshots: [
        {
          imageUrl: { type: String, required: true }, // Stores snapshot image
          aiSummary: { type: String } // AI-generated summary for this snapshot
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
