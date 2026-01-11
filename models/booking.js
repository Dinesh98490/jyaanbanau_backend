import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        classId: {
            // Assuming class IDs are strings or ObjectIds. Let's start with String from frontend or ref if Class Model is used.
            // Based on Class.jsx, `cls._id`.
            type: String,
            required: true,
        },
        className: {
            type: String,
            required: true,
        },
        trainerName: {
            type: String,
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["Booked", "Cancelled", "Completed"],
            default: "Booked",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
