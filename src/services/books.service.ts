import pool from "../config/db";

const isValidYear = (year: number) => year > 0 && year <= new Date().getFullYear();
const isValidString = (str: string, maxLength: number) => str && str.trim().length > 0 && str.length <= maxLength;

export const addBook = async (title: string, authorId: number, publishedYear: number, genre: string) => {
    try {
        if (!isValidString(title, 255) || !isValidString(genre, 100)) {
            return { success: false, message: "Title and genre must be non-empty and within character limits" };
        }
        if (!isValidYear(publishedYear)) {
            return { success: false, message: "Invalid published year" };
        }
        if (!authorId) {
            return { success: false, message: "Author ID is required" };
        }
        
        const [authorExists]: any = await pool.execute("SELECT id FROM authors WHERE id = ?", [authorId]);
        if (authorExists.length === 0) {
            return { success: false, message: "Author not found" };
        }

        const [result]: any = await pool.execute(
            "INSERT INTO books (title, author_id, published_year, genre) VALUES (?, ?, ?, ?)",
            [title, authorId, publishedYear, genre]
        );
        return { success: true, message: "Book added successfully", bookId: result.insertId };
    } catch (error) {
        console.error("Add book error:", error);
        return { success: false, message: "Database error" };
    }
};

export const getBooks = async () => {
    try {
        const [books]: any = await pool.execute("SELECT * FROM books");
        return { success: true, books };
    } catch (error) {
        console.error("Get books error:", error);
        return { success: false, message: "Database error" };
    }
};

export const updateBook = async (id: number, title: string, publishedYear: number, genre: string) => {
    try {
        if (!isValidString(title, 255) || !isValidString(genre, 100)) {
            return { success: false, message: "Title and genre must be non-empty and within character limits" };
        }
        if (!isValidYear(publishedYear)) {
            return { success: false, message: "Invalid published year" };
        }

        const [result]: any = await pool.execute(
            "UPDATE books SET title = ?, published_year = ?, genre = ? WHERE id = ?",
            [title, publishedYear, genre, id]
        );
        if (result.affectedRows === 0) {
            return { success: false, message: "Book not found" };
        }
        return { success: true, message: "Book updated successfully" };
    } catch (error) {
        console.error("Update book error:", error);
        return { success: false, message: "Database error" };
    }
};

export const deleteBook = async (id: number) => {
    try {
        const [result]: any = await pool.execute("DELETE FROM books WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return { success: false, message: "Book not found" };
        }
        return { success: true, message: "Book deleted successfully" };
    } catch (error) {
        console.error("Delete book error:", error);
        return { success: false, message: "Database error" };
    }
};
