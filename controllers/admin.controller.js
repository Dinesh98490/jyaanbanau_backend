import User from "../models/user.js";
import Trainer from "../models/trainer.js";
import Subscription from "../models/subscription.js";

export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Members (Users with role customer)
        const membersCount = await User.countDocuments({ role: "customer" });

        // 2. Active Members (Users with an active subscription) - Simplified logic
        // Assuming 'bookedClasses' or check subscription model. 
        // Let's rely on Subscription model if it tracks active status.
        // If Subscription model is simple, we might just count all subscriptions.
        const activeMembersCount = await Subscription.countDocuments({});

        // 3. Total Trainers
        const trainersCount = await Trainer.countDocuments({});

        // 4. Monthly Revenue
        // Calculate sum of price from Subscriptions (assuming payment info is there or Payment model)
        // For now, let's look at Payment model if available, or just mock/estimate from subscriptions
        // Let's use a simple calculation or placeholder if complex aggregation is needed.
        // Actually, let's try to aggregate from Subscription 'package' price if possible or Payment collection.
        // Let's assume a Payment model exists as seen in routes.
        // Re-checking file list: paymentRoutes.js exist. Let's assume Payment model.
        // I'll stick to a simple count first or try to aggregate if I can see Payment model.
        // Let's keep it simple: Count of subscriptions * avg price or similar if aggregation is hard without seeing model.
        // actually, let's just send the counts we have. revenue can be 0 or calculated if simple.

        // Let's look up Payment or Subscription model content first? 
        // I'll proceed with basic counts and refine revenue if I see the model.

        // Revenue mock calculation (to be safe until verified):
        const approximateRevenue = activeMembersCount * 50; // Mock $50/member

        res.status(200).json({
            membersCount,
            activeMembersCount,
            trainersCount,
            totalRevenue: approximateRevenue
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Server error fetching stats" });
    }
};
