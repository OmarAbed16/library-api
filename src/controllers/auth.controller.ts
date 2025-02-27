import { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const registerAuthor = async (req: Request, res: Response) => {
    try {
        const { name, email, password, bio } = req.body;
        await register(name, email, password, bio);
        res.status(201).json({ message: "Author registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginAuthor = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        if (!token)
            { 
                 res.status(401).json({ message: "Invalid credentials" });
            }
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
