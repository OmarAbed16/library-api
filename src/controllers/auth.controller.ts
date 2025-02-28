import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
    async registerAuthor(req: Request, res: Response) {
        try {
            const { name, email, password, bio } = req.body;
            const result = await AuthService.register(name, email, password, bio);
             res.status(result.success ? 201 : 400).json({ message: result.message });
        } catch (error) {
            console.error("Register error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }

    async loginAuthor(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                 res.status(400).json({ message: "Email and password are required" });
                 return;
            }
            
            const result = await AuthService.login(email, password);
             res.status(result.success ? 200 : 401).json(
                result.success ? { message: result.message, token: result.token } : { message: result.message }
            );
        } catch (error) {
            console.error("Login error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new AuthController();
