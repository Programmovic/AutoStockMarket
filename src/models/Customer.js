const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactDetails: String,
  debts: Number,
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
