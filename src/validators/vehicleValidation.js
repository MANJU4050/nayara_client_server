// utils/validation.js
const Joi = require("joi");

const vehicleRegistrationSchema = Joi.object({
  name: Joi.string().required().min(3).max(15),
  mobile: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
  vehicleNumber: Joi.string().required().min(5).max(10),
  registrationDate: Joi.string().isoDate(),
  uniqueId: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/)
    .message("Invalid Coupon Code"),
  agentId: Joi.string().length(24).hex().required(),
  agentName: Joi.string().required().min(3).max(15),
});

module.exports = {
  vehicleRegistrationSchema,
};
