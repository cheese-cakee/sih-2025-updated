const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const busRoutes = require("./routes/busRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// Bus routes (all handled inside busRoutes.js)
app.use("/buses", busRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () =>
      console.log("🚀 Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error: ", err));
