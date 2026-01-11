import express from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  bookClass,
} from "../controllers/classController.js";

const router = express.Router();

// CRUD routes for GymClass
router.post("/", createClass);
router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.post("/book/:id", bookClass);

export default router;
