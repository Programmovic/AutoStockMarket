const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    attendanceStatus: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      default: "Present",
    },
    shift: {
      type: String,
      enum: ["Morning", "Afternoon", "Night"],
    },
    location: String,
    notes: String,
    timeIn: { 
      type: Date, 
      required: function() { return this.attendanceStatus === 'Present' || this.attendanceStatus === 'Late'; } 
    },
    timeOut: { 
      type: Date, 
      required: function() { return this.attendanceStatus === 'Present' || this.attendanceStatus === 'Late'; } 
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true }); // Add index for employee and date fields

module.exports = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
