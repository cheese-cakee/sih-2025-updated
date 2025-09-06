const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeNumber: String,
  source: String,
  destination: String,
  buses: [String],
});

module.exports = mongoose.model("Route", routeSchema);
