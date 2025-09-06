const express = require("express");
const router = express.Router();
const Route = require("../models/Route"); // import your Mongoose model

// @desc   Get all buses
// @route  GET /buses
// @access Public (you can add auth later)
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find(); // fetch from MongoDB
    res.json(routes);
  } catch (err) {
    console.error("❌ Error fetching buses:", err);
    res.status(500).json({ error: "Server error while fetching buses" });
  }
});

router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

// @route POST /buses
router.post("/", async (req, res) => {
  try {
    const { number, route } = req.body;
    const newRoute = new Route({ number, route });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    console.error("❌ Error adding bus:", err);
    res.status(500).json({ error: "Server error while adding bus" });
  }
});

module.exports = router;
