import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    trainerName: {
      type: String,
      required: true,
      trim: true,
    },
    totalMembers: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    image: {
      type: String, // Base64 string or URL
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

const GymClass = mongoose.model("Class", classSchema);

export default GymClass;
