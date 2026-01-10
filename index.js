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

const router = express.Router();

// Health check
router.get("/v1/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

// User routes
router.use("/api/users", userRoutes);

export default router;
