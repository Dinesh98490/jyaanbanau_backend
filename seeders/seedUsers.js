
import mongoose from "mongoose";
import User from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jyaanbanau");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedUsers = async () => {
    await connectDB();

    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin";
        const adminUsername = "Admin";

        const existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            console.log("Admin user already exists");
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await User.create({
                username: adminUsername,
                email: adminEmail,
                password: hashedPassword,
                // Add any other required fields here if necessary
            });
            console.log("Admin user created successfully");
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedUsers();
