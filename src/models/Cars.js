const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: String,
    model: String,
    chassisNumber: { type: String, unique: true, required: true },
    owner: String,
    purchaseDetails: String,
    maintenance: String,
    currentLocation: String,
    entryDate: { type: Date, default: Date.now }, // Add entryDate field
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Car || mongoose.model("Car", carSchema);
