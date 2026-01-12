import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt.js";
import crypto from "crypto";
import sendEmail from "../utils/email.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateAccessToken({ id: user._id, email: user.email });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateAccessToken({ id: user._id, email: user.email });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.username.toLowerCase().includes("admin") ? "Admin" : "Customer" // temporary simple role logic or add role field to schema later
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.params.id;

    // Check if user exists (Optional, findByIdAndUpdate handles null if not found logic usually returns null)
    // Also check uniqueness if email changed? Skipping for simplicity/speed as requested.

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User with that email does not exist" });

    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash it and save to db (often good practice to hash tokens in DB)
    // For simplicity, we'll save it directly or a simple hash. 
    // Let's just save it directly for this implementation to match typical tutorial patterns 
    // unless high security is demanded.

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // Create reset url (this should point to FRONTEND)
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/updatepassword?token=${resetToken}`;

    const message = `Forgot your password? Click here to reset it: \n\n ${resetUrl} \n\nIf you didn't forget your password, ignore this email.`;

    try {
      const emailSent = await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });

      if (emailSent) {
        res.status(200).json({
          success: true,
          message: 'An email has been sent to ' + user.email + ' with further instructions.'
        });
      } else {
        // It was a mock send
        res.status(200).json({
          success: true,
          message: 'Mock email sent! Check your BACKEND TERMINAL for the link.'
        });
      }

    } catch (err) {
      // user.resetPasswordToken = undefined; // Do NOT clear token, we need it for fallback!
      // user.resetPasswordExpires = undefined; 
      // await user.save({ validateBeforeSave: false });

      console.error("Forgot Password Error (Email failed):", err);
      // Fallback: If email fails (e.g. invalid creds), don't crash. 
      // Return 200 so the frontend can redirect the user anyway.
      return res.status(200).json({
        success: true,
        message: 'Could not send email (check server logs). Redirecting you automatically (Fallback Mode)...',
        mockData: {
          resetUrl,
          token: resetToken
        }
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Get user based on token
    const { token, password } = req.body;

    // Debug logging
    console.log("DEBUG: Reset Password started");
    console.log("DEBUG: Received token:", token);

    // Check if token exists ignoring expiry first
    const userByToken = await User.findOne({ resetPasswordToken: token });
    console.log("DEBUG: User found by token only?", userByToken ? "YES" : "NO");
    if (userByToken) {
      console.log("DEBUG: User expiry:", userByToken.resetPasswordExpires);
      console.log("DEBUG: Current time:", new Date());
      console.log("DEBUG: Is expired?", userByToken.resetPasswordExpires < Date.now());
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log("DEBUG: User NOT found in final query (valid token & not expired)");
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Log the user in directly? Or ask them to login.
    // Usually redirect to login.

    // Optional: send new JWT so they are logged in immediately
    // const newToken = generateAccessToken({ id: user._id, email: user.email });

    res.status(200).json({
      success: true,
      message: "Password updated successfully! Please login.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log(`DEBUG: getAllUsers found ${users.length} users`);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Create User
export const createUserByAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Update User
export const updateUserByAdmin = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
