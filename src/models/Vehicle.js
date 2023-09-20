// models/Vehicle.js
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    uniqueId: { type: String, required: true },
    agentId: { type: String, required: true },
    agentName: String,
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
