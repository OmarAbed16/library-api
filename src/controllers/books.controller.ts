import { Request, Response } from "express";
import { addBook, getBooks, updateBook, deleteBook } from "../services/books.service";

export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, authorId, publishedYear, genre } = req.body;

        const result = await addBook(title, authorId, publishedYear, genre);

         res.status(result.success ? 201 : 400).json({ message: result.message });
    } catch (error) {
        console.error("Create book error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};

export const listBooks = async (req: Request, res: Response) => {
    try {
        const result = await getBooks();
         res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        console.error("List books error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};

export const editBook = async (req: Request, res: Response) => {
    try {
        const { title, publishedYear, genre } = req.body;
        const { id } = req.params;

        const result = await updateBook(Number(id), title, publishedYear, genre);

         res.status(result.success ? 200 : 400).json({ message: result.message });
    } catch (error) {
        console.error("Edit book error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};

export const removeBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteBook(Number(id));

         res.status(result.success ? 200 : 400).json({ message: result.message });
    } catch (error) {
        console.error("Remove book error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};
