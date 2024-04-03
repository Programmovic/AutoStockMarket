const mongoose = require('mongoose');

const maintenanceTaskSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  taskDescription: String,
  taskDate: Date,
  taskCost: Number,
}, { timestamps: true });

module.exports = mongoose.model("MaintenanceTask", maintenanceTaskSchema);
