// models/Agent.js
const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    mobile: String,
    number: String,
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
