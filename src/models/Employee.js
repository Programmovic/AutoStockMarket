const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  hireDate: Date,
  salary: Number,
  bonuses: Number,
  deductions: Number,
  benefits: String,
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
