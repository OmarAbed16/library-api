import { Request, Response } from "express";
import AuthorService from "../services/authors.service";

class AuthorController {
    async listAuthors(req: Request, res: Response) {
        try {
            const result = await AuthorService.getAuthors();
             res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
            console.error("List authors error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }

    async editAuthor(req: Request, res: Response) {
        try {
            const { name, bio } = req.body;
            const { id } = req.params;
            const result = await AuthorService.updateAuthor(Number(id), name, bio);
             res.status(result.success ? 200 : 400).json({ message: result.message });
        } catch (error) {
            console.error("Edit author error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }

    async removeAuthor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await AuthorService.deleteAuthor(Number(id));
             res.status(result.success ? 200 : 400).json({ message: result.message });
        } catch (error) {
            console.error("Remove author error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new AuthorController();
