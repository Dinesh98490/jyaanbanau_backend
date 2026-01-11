import Booking from "../models/booking.js";

// Create Booking
export const createBooking = async (req, res) => {
    try {
        const { userId, userName, classId, className, trainerName } = req.body;

        // Check if duplicate booking
        const existing = await Booking.findOne({ userId, classId, status: "Booked" });
        if (existing) {
            return res.status(400).json({ success: false, message: "You have already booked this class." });
        }

        const booking = new Booking({
            userId,
            userName,
            classId,
            className,
            trainerName
        });

        await booking.save();
        res.status(201).json({ success: true, message: "Class booked successfully", data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ userId, status: "Booked" }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
    try {
        // Delete explicitly
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, message: "Booking cancelled" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
