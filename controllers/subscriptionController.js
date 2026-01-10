import Subscription from "../models/subscription.js";


export const createSubscription = async (req, res) => {
  try {
    const { subscriptionName, price, features } = req.body;

    // Ensure features is an array
    const featuresArray = Array.isArray(features) ? features : [features];

    const subscription = new Subscription({
      subscriptionName,
      price,
      features: featuresArray,
    });

    await subscription.save();
    res.status(201).json({ success: true, message: "Subscription created", data: subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all subscriptions
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET subscription by ID
export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription)
      return res.status(404).json({ success: false, message: "Subscription not found" });
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE subscription
export const updateSubscription = async (req, res) => {
  try {
    const { subscriptionName, price, features } = req.body;
    const featuresArray = Array.isArray(features) ? features : [features];

    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { subscriptionName, price, features: featuresArray },
      { new: true }
    );

    if (!subscription)
      return res.status(404).json({ success: false, message: "Subscription not found" });

    res.status(200).json({ success: true, message: "Subscription updated", data: subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE subscription
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription)
      return res.status(404).json({ success: false, message: "Subscription not found" });

    res.status(200).json({ success: true, message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
