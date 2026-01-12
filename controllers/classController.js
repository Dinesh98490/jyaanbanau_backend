import GymClass from "../models/class.js";
import User from "../models/user.js";

// Create a new class
export const createClass = async (req, res) => {
  try {
    const { name, description, totalMembers, level, trainerName, image } = req.body;

    if (!name || !description || !level || !trainerName) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    const gymClass = await GymClass.create({
      name,
      description,
      totalMembers,
      level,
      trainerName,
      image
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      gymClass,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await GymClass.find();
    res.json({ success: true, classes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a single class by ID
export const getClassById = async (req, res) => {
  try {
    const gymClass = await GymClass.findById(req.params.id);
    if (!gymClass) return res.status(404).json({ success: false, message: "Class not found" });

    res.json({ success: true, gymClass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a class
export const updateClass = async (req, res) => {
  try {
    const gymClass = await GymClass.findByIdAndUpdate(
      req.params.id,
      req.body, // Body now includes 'image' if sent
      { new: true }
    );
    if (!gymClass) return res.status(404).json({ success: false, message: "Class not found" });

    res.json({ success: true, message: "Class updated successfully", gymClass });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const gymClass = await GymClass.findByIdAndDelete(req.params.id);
    if (!gymClass) return res.status(404).json({ success: false, message: "Class not found" });

    res.json({ success: true, message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Book a class
// Book a class
export const bookClass = async (req, res) => {
  try {
    const { userId } = req.body;
    const classId = req.params.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    // Update User
    await User.findByIdAndUpdate(userId, {
      $addToSet: { bookedClasses: classId }
    });

    res.status(200).json({ success: true, message: "Class booked successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
