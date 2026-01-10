import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    photo: { type: String, required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Trainer", trainerSchema);
