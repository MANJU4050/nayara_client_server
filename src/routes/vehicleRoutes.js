// routes/vehicleRoutes.js
const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

router.post("/register", vehicleController.registerVehicle);

module.exports = router;
