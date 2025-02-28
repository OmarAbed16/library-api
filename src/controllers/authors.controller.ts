import { Request, Response } from "express";
import { getAuthors, updateAuthor, deleteAuthor } from "../services/authors.service";

export const listAuthors = async (req: Request, res: Response) => {
    try {
        const result = await getAuthors();
         res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        console.error("List authors error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};

export const editAuthor = async (req: Request, res: Response) => {
    try {
        const { name, bio } = req.body;
        const { id } = req.params;

        const result = await updateAuthor(Number(id), name, bio);
         res.status(result.success ? 200 : 400).json({ message: result.message });
    } catch (error) {
        console.error("Edit author error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};

export const removeAuthor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteAuthor(Number(id));

         res.status(result.success ? 200 : 400).json({ message: result.message });
    } catch (error) {
        console.error("Remove author error:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};
