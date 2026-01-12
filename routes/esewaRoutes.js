import express from "express";
import { initiatePayment, verifyPayment } from "../controllers/esewaController.js";

const router = express.Router();

// Initiate eSewa payment
router.post("/initiate", initiatePayment);

// Verify eSewa payment
router.get("/verify", verifyPayment);

export default router;
