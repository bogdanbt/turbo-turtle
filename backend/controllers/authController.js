const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const SECRET_KEY = "your_secret_key";

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ id: userId, message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "24h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to load profile" });
  }
};

exports.saveResult = async (req, res) => {
  try {
    const result = req.body;
    const updatedUser = await userModel.addUserResult(req.user.id, result);
    res.json({ message: "Result saved", results: updatedUser.results });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save result", error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await userModel.getUserStats(req.user.id);
    res.json(stats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch stats", error: err.message });
  }
};
