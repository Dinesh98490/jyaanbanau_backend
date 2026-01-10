import express from "express";
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// Create subscription
router.post("/", createSubscription);

// Get all subscriptions
router.get("/", getSubscriptions);

// Get subscription by ID
router.get("/:id", getSubscriptionById);

// Update subscription
router.put("/:id", updateSubscription);

// Delete subscription
router.delete("/:id", deleteSubscription);

export default router;
