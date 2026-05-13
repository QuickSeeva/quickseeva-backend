const express = require("express");
const router = express.Router();

const { createRide, respondToRide, completeRide } = require("../controllers/rideController");

router.post("/create", createRide);
router.post("/respond", respondToRide);
router.post("/complete", completeRide);

module.exports = router;