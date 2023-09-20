// controllers/vehicleController.js
const Vehicle = require("../models/Vehicle");
const Agent = require("../models/Agent");
const UniqueId = require("../models/UniqueId");

const {
  vehicleRegistrationSchema,
} = require("../validators/vehicleValidation");

async function registerVehicle(req, res) {
  try {
    const { error } = vehicleRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, mobile, vehicleNumber, agentName, agentId, uniqueId } =
      req.body;

    const existingAgent = await Agent.findOne({ _id: agentId });
    if (!existingAgent) {
      return res.status(400).json({ error: "Agent not found" });
    }
    const idRecord = await UniqueId.findOne({ uniqueId });
    if (!idRecord) {
      return res.status(400).json({ error: "Invalid Coupon Code" });
    }

    if (idRecord?.isUsed) {
      return res.status(400).json({ error: "Coupon already used" });
    }

    const registrationDate = new Date();
    const newRegistration = new Vehicle({
      name,
      mobile,
      vehicleNumber,
      registrationDate,
      agentName,
      agentId,
      uniqueId,
    });
    await newRegistration.save();

    // Mark the uniqueId as used
    idRecord.isUsed = true;
    await idRecord.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
}

module.exports = {
  registerVehicle,
};
