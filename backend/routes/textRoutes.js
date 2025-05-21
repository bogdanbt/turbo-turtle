const express = require("express");
const router = express.Router();
const textController = require("../controllers/textController");

router.get("/random", textController.getRandomText);
router.get("/:id", textController.getTextById);
router.post("/", textController.createText);
router.delete("/:id", textController.deleteText);

module.exports = router;
