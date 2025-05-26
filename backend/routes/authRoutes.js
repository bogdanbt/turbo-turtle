const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", auth, authController.getMe);

router.post("/result", auth, authController.saveResult);
router.get("/stats", auth, authController.getStats);

module.exports = router;
