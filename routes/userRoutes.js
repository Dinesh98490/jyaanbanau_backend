import express from "express";
import { registerUser, loginUser, updateUser, forgotPassword, resetPassword, getAllUsers, deleteUser, createUserByAdmin, updateUserByAdmin } from "../controllers/userController.js";
import { uploadProfileImage } from "../controllers/uploadProfileImageController.js";
import { getUserById } from "../controllers/getUserController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/:id", updateUser);
router.get("/:id", getUserById);

// Profile image upload
router.post("/:id/upload-profile-image", upload.single("profileImage"), uploadProfileImage);

// Admin routes for user management
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", verifyToken, verifyAdmin, createUserByAdmin);
router.put("/:id", verifyToken, verifyAdmin, updateUserByAdmin);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
