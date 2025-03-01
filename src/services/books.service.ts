import Database from "../config/db";

class BookService {
    private isValidYear(year: number): boolean {
        return year > 0 && year <= new Date().getFullYear();
    }

    private isValidString(str: string, maxLength: number): boolean {
        return !!str && str.trim().length > 0 && str.length <= maxLength;
    }
    async addBook(title: string, authorId: number, publishedYear: number, genre: string) {
        try {
            if (!this.isValidString(title, 255) || !this.isValidString(genre, 100)) {
                return { success: false, message: "Title and genre must be non-empty and within character limits" };
            }
            if (!this.isValidYear(publishedYear)) {
                return { success: false, message: "Invalid published year" };
            }
            if (!authorId) {
                return { success: false, message: "Author ID is required" };
            }
            
            const [authorExists]: any = await Database.execute("SELECT id FROM authors WHERE id = ? and is_deleted=?", [authorId,0]);
            if (authorExists.length === 0) {
                return { success: false, message: "Author not found" };
            }

            const [result]: any = await Database.execute(
                "INSERT INTO books (title, author_id, published_year, genre) VALUES (?, ?, ?, ?)",
                [title, authorId, publishedYear, genre]
            );
            return { success: true, message: "Book added successfully", bookId: result.insertId };
        } catch (error) {
            console.error("Add book error:", error);
            return { success: false, message: "Database error" };
        }
    }

    async getBooks() {
        try {
            const [books]: any = await Database.execute("SELECT id,title,author_id,	published_year,genre FROM books where is_deleted=?",[0]);
            return { success: true, books };
        } catch (error) {
            console.error("Get books error:", error);
            return { success: false, message: "Database error" };
        }
    }

    async updateBook(id: number, title: string, publishedYear: number, genre: string) {
        try {
            if (!this.isValidString(title, 255) || !this.isValidString(genre, 100)) {
                return { success: false, message: "Title and genre must be non-empty and within character limits" };
            }
            if (!this.isValidYear(publishedYear)) {
                return { success: false, message: "Invalid published year" };
            }

            const [result]: any = await Database.execute(
                "UPDATE books SET title = ?, published_year = ?, genre = ? WHERE id = ? and is_deleted=?",
                [title, publishedYear, genre, id,0]
            );
            if (result.affectedRows === 0) {
                return { success: false, message: "Book not found" };
            }
            return { success: true, message: "Book updated successfully" };
        } catch (error) {
            console.error("Update book error:", error);
            return { success: false, message: "Database error" };
        }
    }

    async deleteBook(id: number) {
        try {
            const [result]: any = await Database.execute("UPDATE books SET is_deleted=? WHERE id = ? and is_deleted=?", [1,id,0]);
            if (result.affectedRows === 0) {
                return { success: false, message: "Book not found" };
            }
            return { success: true, message: "Book deleted successfully" };
        } catch (error) {
            console.error("Delete book error:", error);
            return { success: false, message: "Database error" };
        }
    }
}

export default new BookService();
