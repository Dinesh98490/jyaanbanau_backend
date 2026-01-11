import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import app from './app.js';
// import { connectDB } from './config/db.js';
// import { env } from './config/env.js';


// const server = http.createServer(app);


// (async () => {
//   try {
//     await connectDB();

//     server.listen(env.PORT, () => {
//       console.log(` Jyaanbanau Server listening on http://localhost:${env.PORT}`);
//       console.log(`WebSocket server ready on ws://localhost:${env.PORT}`);
//     });

//     // Handle server errors
//     server.on('error', (err) => {
//       if (err.code === 'EADDRINUSE') {
//         console.error(`Port ${env.PORT} is already in use.`);
//         console.error(`Solution: Kill the process using port ${env.PORT} or change PORT in .env`);
//         console.error(`   Command: kill -9 $(lsof -ti:${env.PORT})`);
//         process.exit(1);
//       } else {
//         console.error('Server error:', err);
//         process.exit(1);
//       }
//     });

//     // Handle process termination
//     process.on('SIGTERM', () => {
//       console.log('SIGTERM received, shutting down gracefully...');
//       server.close(() => {
//         console.log('Server closed');
//         process.exit(0);
//       });
//     });

//     process.on('SIGINT', () => {
//       console.log('\nSIGINT received, shutting down gracefully...');
//       server.close(() => {
//         console.log('Server closed');
//         process.exit(0);
//       });
//     });
//   } catch (err) {
//     console.error('Failed to start server:', err.message);
//     if (err.message.includes('MongoDB') || err.message.includes('MONGO')) {
//       console.error('Make sure MongoDB is running and MONGO_URI is correct in .env');
//     }
//     process.exit(1);
//   }
// })();

import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"; // import router
import classRoutes from "./routes/classRoutes.js";
import dietPlanRoutes from "./routes/dietPlanRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // causing PathError with newer path-to-regexp


// Body parser
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static('uploads'));

// Mount user routes at /api/users
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/diets", dietPlanRoutes)
app.use("/api/trainers", trainerRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/attendance", attendanceRoutes);


// Health check (optional)
app.get("/v1/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// 404 handler (for all unmatched routes)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/jyaanbanau")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
