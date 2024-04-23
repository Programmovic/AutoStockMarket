const mongoose = require("mongoose");

const carDetailsSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    value: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    capital: { type: Number, default: 0 },
    maintenanceCosts: { type: Number, default: 0 },
    netProfit: Number,
  },
  { timestamps: true }
);


module.exports = mongoose.models.CarDetails || mongoose.model("CarDetails", carDetailsSchema);
