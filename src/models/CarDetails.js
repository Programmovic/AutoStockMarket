const mongoose = require('mongoose');

const carDetailsSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  value: Number,
  sellingPrice: Number,
  capital: Number,
  maintenanceCosts: Number,
  netProfit: Number,
}, { timestamps: true });

module.exports = mongoose.model("CarDetails", carDetailsSchema);
