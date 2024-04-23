const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactDetails: String,
    debts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
