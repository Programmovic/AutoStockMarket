const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: String, // Could use enum here as well
    date: Date,
    amount: Number,
    description: String,
    // For Many-to-Many relation with Partners
    partners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Partner" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
