const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: Date,
    attendanceStatus: String, // Consider using enum for predefined values
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
