import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { env } from "../config/env.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.username.includes("admin"))) {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin rights required." });
    }
};
