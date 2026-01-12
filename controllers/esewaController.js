import crypto from "crypto";

// eSewa Configuration
const ESEWA_MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE || "EPAYTEST";
const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
const ESEWA_PAYMENT_URL = process.env.ESEWA_PAYMENT_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

/**
 * Generate HMAC-SHA256 signature for eSewa payment
 */
function generateSignature(message, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(message);
    return hmac.digest("base64");
}

/**
 * Initiate eSewa payment
 * POST /api/esewa/initiate
 */
export const initiatePayment = async (req, res) => {
    try {
        const { amount, productName, userName } = req.body;

        if (!amount || !productName || !userName) {
            return res.status(400).json({
                success: false,
                message: "Amount, product name, and user name are required",
            });
        }

        // Generate unique transaction UUID
        const transaction_uuid = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Payment details
        const tax_amount = 0;
        const total_amount = parseFloat(amount);
        const product_delivery_charge = 0;
        const product_service_charge = 0;

        // Frontend URLs (adjust based on your frontend deployment)
        const success_url = `${req.protocol}://${req.get("host")}/customer/payment-success`;
        const failure_url = `${req.protocol}://${req.get("host")}/customer/payment-failure`;

        // Fields to be signed
        const signed_field_names = "total_amount,transaction_uuid,product_code";

        // Message for signature
        const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${ESEWA_MERCHANT_CODE}`;

        // Generate signature
        const signature = generateSignature(message, ESEWA_SECRET_KEY);

        // Payment form data
        const paymentData = {
            amount: amount,
            tax_amount: tax_amount,
            total_amount: total_amount,
            transaction_uuid: transaction_uuid,
            product_code: ESEWA_MERCHANT_CODE,
            product_service_charge: product_service_charge,
            product_delivery_charge: product_delivery_charge,
            success_url: success_url,
            failure_url: failure_url,
            signed_field_names: signed_field_names,
            signature: signature,
            payment_url: ESEWA_PAYMENT_URL,
        };

        res.status(200).json({
            success: true,
            message: "Payment data generated successfully",
            data: paymentData,
        });
    } catch (error) {
        console.error("eSewa initiate payment error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Verify eSewa payment
 * GET /api/esewa/verify
 */
export const verifyPayment = async (req, res) => {
    try {
        const { data } = req.query;

        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Payment data is required",
            });
        }

        // Decode the base64 encoded data from eSewa
        const decodedData = Buffer.from(data, "base64").toString("utf-8");
        const paymentInfo = JSON.parse(decodedData);

        // Extract payment details
        const {
            transaction_code,
            status,
            total_amount,
            transaction_uuid,
            product_code,
            signed_field_names,
            signature,
        } = paymentInfo;

        // Verify signature
        const message = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
        const expectedSignature = generateSignature(message, ESEWA_SECRET_KEY);

        if (signature !== expectedSignature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature. Payment verification failed.",
            });
        }

        // Check payment status
        if (status !== "COMPLETE") {
            return res.status(400).json({
                success: false,
                message: "Payment not completed",
                data: paymentInfo,
            });
        }

        // Payment verified successfully
        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            data: {
                transaction_code,
                transaction_uuid,
                total_amount,
                status,
            },
        });
    } catch (error) {
        console.error("eSewa verify payment error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
