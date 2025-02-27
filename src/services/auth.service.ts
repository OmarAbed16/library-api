import pool from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (name: string, email: string, password: string, bio: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
        "INSERT INTO authors (name, email, password, bio) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, bio]
    );
    return result;
};

export const login = async (email: string, password: string) => {
    const [rows]: any = await pool.execute("SELECT * FROM authors WHERE email = ?", [email]);
    if (rows.length === 0) return null;

    const author = rows[0];
    const isMatch = await bcrypt.compare(password, author.password);
    if (!isMatch) return null;

    const token = jwt.sign({ id: author.id, email: author.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return token;
};
