import User from "../models/user.js";

/**
 * Upload profile image
 * POST /api/users/:id/upload-profile-image
 */
export const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided",
            });
        }

        // Construct the image URL
        const imageUrl = `/uploads/${req.file.filename}`;

        // Update user's profile image
        const user = await User.findByIdAndUpdate(
            userId,
            { profileImage: imageUrl },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.error("Upload profile image error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
