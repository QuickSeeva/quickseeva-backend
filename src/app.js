const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const driverRoutes = require("./routes/driverRoutes");

app.use("/api/drivers", driverRoutes);

// IMPORTANT ROUTE IMPORT
const rideRoutes = require("./routes/rideRoutes");

app.use("/api/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;