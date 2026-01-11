// import express from 'express';

// const router = express.Router();

// const userRoutes = require('./routes/userRoutes.js');

// // Route modules - all routes are under /api/v1
// router.get('/v1/health', (req, res) => {
//   res.json({ status: 'ok', uptime: process.uptime() });

// });


// router.use('/api/users', userRoutes);


// export default router;

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import dietPlanRoutes from "./routes/dietPlanRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const router = express.Router();

// Health check
router.get("/v1/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

// User routes
router.use("/users", userRoutes);
router.use("/classes", classRoutes);
router.use("/diets", dietPlanRoutes)
router.use("/trainers", trainerRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/payments", paymentRoutes);
router.use("/progress", progressRoutes);





export default router;
