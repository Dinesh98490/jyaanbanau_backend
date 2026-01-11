import dotenv from "dotenv";
dotenv.config();

console.log("--- Environment Config Check ---");
console.log("Checking for EMAIL_USER...");
if (process.env.EMAIL_USER) {
    console.log("✅ EMAIL_USER is set to: " + process.env.EMAIL_USER);
} else {
    console.log("❌ EMAIL_USER is MISSING");
}

console.log("Checking for EMAIL_PASS...");
if (process.env.EMAIL_PASS) {
    console.log("✅ EMAIL_PASS is set (Hidden for security)");
} else {
    console.log("❌ EMAIL_PASS is MISSING");
}

console.log("Checking for SMTP_HOST...");
if (process.env.SMTP_HOST) {
    console.log("ℹ️ SMTP_HOST found: " + process.env.SMTP_HOST);
} else {
    console.log("ℹ️ SMTP_HOST not found (Defaulting to Gmail service logic)");
}
console.log("--------------------------------");
