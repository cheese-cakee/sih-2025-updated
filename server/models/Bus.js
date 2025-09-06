const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  number: { type: String, required: true },
  route: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  timings: [String],
  capacity: Number,
});

module.exports = mongoose.model("Bus", busSchema);

const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const jwt = require("jsonwebtoken");

// Middleware to check token
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Add bus
router.post("/", auth, async (req, res) => {
  const bus = new Bus(req.body);
  await bus.save();
  res.json(bus);
});

// Get all buses
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

module.exports = router;
