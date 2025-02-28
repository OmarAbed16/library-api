import { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const registerAuthor = async (req: Request, res: Response) => {
    try {
        const { name, email, password, bio } = req.body;

        const result = await register(name, email, password, bio);
        
        // ✅ Return the actual message from the service function
         res.status(result.success ? 201 : 400).json({ message: result.message });
    } catch (error) {
        console.error("Register error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};

export const loginAuthor = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
             res.status(400).json({ message: "Email and password are required" });
             return;
        }

        const result = await login(email, password);

         res.status(result.success ? 200 : 401).json(
            result.success ? { message: result.message, token: result.token } : { message: result.message }
        );
    } catch (error) {
        console.error("Login error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};
