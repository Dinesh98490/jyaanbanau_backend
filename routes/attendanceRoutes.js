import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

// CREATE attendance
router.post("/", createAttendance);

// GET all attendance
router.get("/", getAllAttendance);

// GET attendance by ID
router.get("/:id", getAttendanceById);

// UPDATE attendance
router.put("/:id", updateAttendance);

// DELETE attendance
router.delete("/:id", deleteAttendance);

export default router;
