import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protect all admin routes
router.use(verifyToken, verifyAdmin);

router.get("/stats", getDashboardStats);

export default router;
