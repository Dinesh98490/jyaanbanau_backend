import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/user.js';

dotenv.config();

const ensureAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jyaanbanau');
        console.log('MongoDB connected');

        const email = 'admin@gmail.com';
        const password = 'admin';
        const username = 'admin_user'; // Must contain 'admin' for role logic

        let user = await User.findOne({ email });

        if (user) {
            console.log('Admin user found. Updating credentials...');
            user.username = username;
            user.password = await bcrypt.hash(password, 10);
            user.role = "admin";
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            console.log('Admin user updated successfully.');
        } else {
            console.log('Admin user not found. Creating new user...');
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                username,
                email,
                password: hashedPassword,
                role: "admin",
            });
            console.log('Admin user created successfully.');
        }

        console.log('-----------------------------------');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('Role: Admin (via username check)');
        console.log('-----------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

ensureAdmin();
