const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
    },
    startPoint: {
      type: String,
      required: true,
    },
    endPoint: {
      type: String,
      required: true,
    },
    stops: [
      {
        type: String, // list of stop names
      },
    ],
    timings: [
      {
        departure: String, // e.g. "08:00 AM"
        arrival: String,   // e.g. "09:15 AM"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);
