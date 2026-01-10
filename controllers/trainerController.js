import Trainer from "../models/trainer.js";

// CREATE trainer
export const createTrainer = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience } = req.body;
    const trainer = new Trainer({
      name,
      email,
      phone,
      specialization,
      experience,
      photo: req.file ? req.file.path : null,
    });

    await trainer.save();
    res.status(201).json({ success: true, message: "Trainer created successfully", data: trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });
    res.status(200).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE trainer
export const updateTrainer = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience } = req.body;

    const updatedData = { name, email, phone, specialization, experience };
    if (req.file) updatedData.photo = req.file.path;

    const trainer = await Trainer.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

    res.status(200).json({ success: true, message: "Trainer updated successfully", data: trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE trainer
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

    res.status(200).json({ success: true, message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
