const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: String, // Could be an enum [Supplier, Partner, etc.]
    // Transactions managed in the Transactions schema to demonstrate a Many-to-Many relationship
  },
  { timestamps: true }
);

module.exports = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
