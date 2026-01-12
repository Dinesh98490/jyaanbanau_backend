import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    bookedClasses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GymClass'
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
