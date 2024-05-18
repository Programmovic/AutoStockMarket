const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactDetails: {
      email: String,
      phone: String,
      nationality: String
    },
    debts: { type: Number, default: 0 },
    nationalID: String // Add nationalID field
  },
  { timestamps: true }
);

module.exports = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
