import { Request, Response } from "express";
import BookService from "../services/books.service";

class BookController {
    async createBook(req: Request, res: Response) {
        try {
            const { title, authorId, publishedYear, genre } = req.body;
            const result = await BookService.addBook(title, authorId, publishedYear, genre);
             res.status(result.success ? 201 : 400).json({ message: result.message });
        } catch (error) {
            console.error("Create book error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }

    async listBooks(req: Request, res: Response) {
        try {
            const result = await BookService.getBooks();
             res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
            console.error("List books error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }

    async editBook(req: Request, res: Response) {
        try {
            const { title, publishedYear, genre } = req.body;
            const { id } = req.params;
            const result = await BookService.updateBook(Number(id), title, publishedYear, genre);
             res.status(result.success ? 200 : 400).json({ message: result.message });
        } catch (error) {
            console.error("Edit book error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }

    async removeBook(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await BookService.deleteBook(Number(id));
             res.status(result.success ? 200 : 400).json({ message: result.message });
        } catch (error) {
            console.error("Remove book error:", error);
             res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new BookController();
