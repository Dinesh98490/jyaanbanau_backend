import express from "express";
import {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} from "../controllers/trainerController.js";
import upload from "../middlewares/upload.js"; 

const router = express.Router();

// CREATE trainer
router.post("/", upload.single("photo"), createTrainer);

// GET all trainers
router.get("/", getTrainers);

// GET trainer by ID
router.get("/:id", getTrainerById);

// UPDATE trainer
router.put("/:id", upload.single("photo"), updateTrainer);

// DELETE trainer
router.delete("/:id", deleteTrainer);

export default router;
