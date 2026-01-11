import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String, // Goal Title
      required: false, // Optional for backward compatibility or strict? Let's make it optional for now
      trim: true,
    },
    duration: {
      type: String, // Changed to String to accept "1 month", "12/31/2025" etc.
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
