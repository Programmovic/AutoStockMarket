const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    invoiceDate: Date,
    totalAmount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
