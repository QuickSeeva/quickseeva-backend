const express = require("express");
const router = express.Router();

const { addDriver } = require("../controllers/driverController");
const { getAvailableDrivers } = require("../controllers/driverController");

router.post("/add", addDriver);
router.get("/available", getAvailableDrivers);

module.exports = router;