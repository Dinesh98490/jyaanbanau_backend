import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number, 
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
