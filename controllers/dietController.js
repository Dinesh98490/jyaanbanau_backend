import DietPlan from "../models/diets.js";


export const createDietPlan = async (req, res) => {
  try {
    const { planName, proteinLevel, dailyCalories, description } = req.body;

    const dietPlan = new DietPlan({
      planName,
      proteinLevel,
      dailyCalories,
      description,
      image: req.file ? req.file.path : null,
    });

    await dietPlan.save();

    res.status(201).json({
      success: true,
      message: "Diet plan created successfully",
      data: dietPlan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getDietPlanById = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE diet plan
 */
export const updateDietPlan = async (req, res) => {
  try {
    const { planName, proteinLevel, dailyCalories, description } = req.body;

    const updatedData = {
      planName,
      proteinLevel,
      dailyCalories,
      description,
    };

    // Update image if new file uploaded
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedPlan = await DietPlan.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Diet plan updated successfully",
      data: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE diet plan
 */
export const deleteDietPlan = async (req, res) => {
  try {
    const deletedPlan = await DietPlan.findByIdAndDelete(req.params.id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Diet plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
