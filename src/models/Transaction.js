const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    description: String,
    partners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Partner" }],
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
