import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      trim: true,
    },
    proteinLevel: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dietaryDetails: {
      include: [String],
      avoid: [String],
      sampleMenu: {
        breakfast: String,
        lunch: String,
        dinner: String,
        snack: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diets", dietPlanSchema);
