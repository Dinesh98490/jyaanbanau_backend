import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "Debit Card", "PayPal", "eSewa", "Cash"], // you can adjust
    },
    subscription: {
      type: String, 
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
