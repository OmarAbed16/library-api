import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
    user?: any;
}

class AuthMiddleware {
    authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token)
        {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET!);
            next();
        } catch (error) {
            res.status(403).json({ message: "Forbidden" });
        }
    }
}

// Export a singleton instance
export default new AuthMiddleware();
