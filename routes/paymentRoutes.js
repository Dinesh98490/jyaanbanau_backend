import express from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// CREATE payment
router.post("/", createPayment);

// GET all payments
router.get("/", getPayments);

// GET payment by ID
router.get("/:id", getPaymentById);

// UPDATE payment
router.put("/:id", updatePayment);

// DELETE payment
router.delete("/:id", deletePayment);

export default router;
