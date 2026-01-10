import express from "express";
import {
  createProgress,
  getProgressList,
  getProgressById,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";

const router = express.Router();

// CREATE progress
router.post("/", createProgress);

// GET all progress
router.get("/", getProgressList);

// GET progress by ID
router.get("/:id", getProgressById);

// UPDATE progress
router.put("/:id", updateProgress);

// DELETE progress
router.delete("/:id", deleteProgress);

export default router;
