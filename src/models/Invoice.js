const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  invoiceDate: Date,
  totalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);
