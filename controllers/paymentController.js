import Payment from "../models/payment.js";

// CREATE payment
export const createPayment = async (req, res) => {
  try {
    const { name, paymentMethod, subscription, price } = req.body;

    const payment = new Payment({ name, paymentMethod, subscription, price });
    await payment.save();

    res.status(201).json({ success: true, message: "Payment created", data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment)
      return res.status(404).json({ success: false, message: "Payment not found" });
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE payment
export const updatePayment = async (req, res) => {
  try {
    const { name, paymentMethod, subscription, price } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { name, paymentMethod, subscription, price },
      { new: true }
    );

    if (!payment)
      return res.status(404).json({ success: false, message: "Payment not found" });

    res.status(200).json({ success: true, message: "Payment updated", data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE payment
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment)
      return res.status(404).json({ success: false, message: "Payment not found" });

    res.status(200).json({ success: true, message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
