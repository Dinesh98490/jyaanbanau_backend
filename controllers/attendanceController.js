import Attendance from "../models/attendance.js";

// CREATE attendance
export const createAttendance = async (req, res) => {
  try {
    const { userId, date, status, checkInTime, checkOutTime, sessionId, remarks } = req.body;

    const attendance = new Attendance({
      userId,
      date,
      status,
      checkInTime,
      checkOutTime,
      sessionId,
      remarks,
    });

    await attendance.save();
    res.status(201).json({ success: true, message: "Attendance recorded", data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("userId", "name") // populate user name
      .populate("sessionId", "name") // populate session name
      .sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate("userId", "name")
      .populate("sessionId", "name");

    if (!record)
      return res.status(404).json({ success: false, message: "Attendance not found" });

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE attendance
export const updateAttendance = async (req, res) => {
  try {
    const { userId, date, status, checkInTime, checkOutTime, sessionId, remarks } = req.body;

    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { userId, date, status, checkInTime, checkOutTime, sessionId, remarks },
      { new: true }
    );

    if (!record)
      return res.status(404).json({ success: false, message: "Attendance not found" });

    res.status(200).json({ success: true, message: "Attendance updated", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE attendance
export const deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);

    if (!record)
      return res.status(404).json({ success: false, message: "Attendance not found" });

    res.status(200).json({ success: true, message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
