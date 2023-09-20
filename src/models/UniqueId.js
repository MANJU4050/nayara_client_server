const mongoose = require("mongoose");

const idSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, required: true },
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UniqueId = mongoose.model("UniqueId", idSchema);

module.exports = UniqueId;
