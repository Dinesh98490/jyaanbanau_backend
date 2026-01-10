import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Excused"],
      required: true,
    },
    checkInTime: Date,
    checkOutTime: Date,
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session", 
    },
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
