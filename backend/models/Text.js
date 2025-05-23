const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  content: { type: String, required: true },
  language: { type: String, required: true },
  difficulty: { type: String, required: true },
  recommended_time: { type: Number },
  title: { type: String },
});

module.exports = mongoose.model("Text", textSchema);
