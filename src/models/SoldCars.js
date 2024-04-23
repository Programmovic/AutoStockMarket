const mongoose = require("mongoose");

const soldCarSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    previousOwner: String,
    purchaser: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // Reference to Customer model
    purchaseDate: Date,
    purchasePrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.models.SoldCar || mongoose.model("SoldCar", soldCarSchema);
