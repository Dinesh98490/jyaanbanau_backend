import express from "express";
import {
  createDietPlan,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan,
} from "../controllers/dietController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createDietPlan);
router.get("/", getDietPlans);
router.get("/:id", getDietPlanById);
router.put("/:id", upload.single("image"), updateDietPlan);
router.delete("/:id", deleteDietPlan);

export default router;
