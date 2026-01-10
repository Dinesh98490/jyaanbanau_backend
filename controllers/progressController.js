import Progress from "../models/progress.js";

// CREATE progress
export const createProgress = async (req, res) => {
  try {
    const { name, duration, percentage } = req.body;

    const progress = new Progress({ name, duration, percentage });
    await progress.save();

    res.status(201).json({ success: true, message: "Progress created", data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all progress
export const getProgressList = async (req, res) => {
  try {
    const progressList = await Progress.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: progressList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET progress by ID
export const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress)
      return res.status(404).json({ success: false, message: "Progress not found" });
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE progress
export const updateProgress = async (req, res) => {
  try {
    const { name, duration, percentage } = req.body;

    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      { name, duration, percentage },
      { new: true }
    );

    if (!progress)
      return res.status(404).json({ success: false, message: "Progress not found" });

    res.status(200).json({ success: true, message: "Progress updated", data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE progress
export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);
    if (!progress)
      return res.status(404).json({ success: false, message: "Progress not found" });

    res.status(200).json({ success: true, message: "Progress deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
