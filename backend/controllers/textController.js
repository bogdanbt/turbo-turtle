const model = require("../models/textModel");

exports.getRandomText = async (req, res) => {
  try {
    const { language, difficulty } = req.query;
    const text = await model.getRandomText(language, difficulty);
    if (!text) return res.status(404).json({ error: "No matching texts" });
    res.json(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTextById = async (req, res) => {
  const { id } = req.params;
  const text = await model.getTextById(id);
  if (!text) return res.status(404).json({ error: "Text not found" });
  res.json(text);
};

exports.createText = async (req, res) => {
  const data = req.body;
  const id = await model.insertText(data);
  res.status(201).json({ id });
};

exports.deleteText = async (req, res) => {
  const success = await model.deleteTextById(req.params.id);
  if (!success) return res.status(404).json({ error: "Text not found" });
  res.json({ success: true });
};
