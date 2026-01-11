import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (options) => {
    // 1) Create a transporter
    // If we have specific SMTP host settings, use them. Otherwise fallback to simple Gmail service logic
    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for others
            auth: {
                user: process.env.SMTP_USER || process.env.EMAIL_USER,
                pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
            }
        });
    } else {
        // Fallback or default to Gmail service
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // 2) Define the email options
    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Support" <support@jyaanbanau.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    };

    // 3) Send the email
    // Check if credentials exist at all
    const hasCredentials = (process.env.SMTP_HOST && process.env.SMTP_USER) || (process.env.EMAIL_USER && process.env.EMAIL_PASS);

    if (!hasCredentials) {
        // Fallback for dev without creds
        console.warn("WARN: No email credentials found in .env (EMAIL_USER/EMAIL_PASS). Sending mock email to console.");
        console.log("========================================");
        console.log("MOCK EMAIL SENT");
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message: ${options.message}`);
        console.log("========================================");
        return false; // Indicates MOCK
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${options.email}`);
        return true; // Indicates REAL
    } catch (error) {
        console.error("Email send failed:", error);
        throw new Error('Email could not be sent. Check server logs.');
    }
};

export default sendEmail;
