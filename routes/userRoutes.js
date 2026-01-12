import express from "express";
import { registerUser, loginUser, updateUser, forgotPassword, resetPassword, getAllUsers, deleteUser, createUserByAdmin, updateUserByAdmin } from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/:id", updateUser);

// Admin routes for user management
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", verifyToken, verifyAdmin, createUserByAdmin);
router.put("/:id", verifyToken, verifyAdmin, updateUserByAdmin);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
