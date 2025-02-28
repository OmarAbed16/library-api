import pool from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const register = async (name: string, email: string, password: string, bio: string) => {
    try {
        if (!name || !email || !password) {
            return { success: false, message: "Name, email, and password are required" };
        }
        if (name.length > 100) {
            return { success: false, message: "Name must be less than 100 characters" };
        }
        if (!isValidEmail(email)) {
            return { success: false, message: "Invalid email format" };
        }
        if (email.length > 255) {
            return { success: false, message: "Email must be less than 255 characters" };
        }
        if (password.length < 8 || password.length > 100) {
            return { success: false, message: "Password must be between 8 and 100 characters long" };
        }
        if (bio.length > 500) {
            return { success: false, message: "Bio must be less than 500 characters" };
        }

        // Check if email already exists
        const [existing]: any = await pool.execute("SELECT id FROM authors WHERE email = ?", [email]);
        if (existing.length > 0) {
            return { success: false, message: "Email is already in use" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(
            "INSERT INTO authors (name, email, password, bio) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, bio]
        );
        return { success: true, message: "Author registered successfully" };
    } catch (error) {
        console.error("Register service error:", error);
        return { success: false, message: "Something went wrong, please try again" };
    }
};

export const login = async (email: string, password: string) => {
    try {
        if (!email || !password) {
            return { success: false, message: "Email and password are required" };
        }
        if (!isValidEmail(email)) {
            return { success: false, message: "Invalid email format" };
        }
        if (email.length > 255) {
            return { success: false, message: "Email must be less than 255 characters" };
        }
        if (password.length < 8 || password.length > 100) {
            return { success: false, message: "Password must be between 8 and 100 characters long" };
        }

        const [rows]: any = await pool.execute("SELECT * FROM authors WHERE email = ?", [email]);

        if (rows.length === 0) {
            return { success: false, message: "User not found" };
        }

        const author = rows[0];
        const isMatch = await bcrypt.compare(password, author.password);
        if (!isMatch) {
            return { success: false, message: "Incorrect email or password" };
        }

        const token = jwt.sign({ id: author.id, email: author.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        return { success: true, token, message: "Login successful" };
    } catch (error) {
        console.error("Login service error:", error);
        return { success: false, message: "Something went wrong, please try again" };
    }
};
