import pool from "../config/db";

export const getAuthors = async () => {
    try {
        const [authors]: any = await pool.execute("SELECT id, name, email, bio FROM authors");
        return { success: true, authors };
    } catch (error) {
        console.error("Get authors error:", error);
        return { success: false, message: "Database error" };
    }
};

export const updateAuthor = async (id: number, name: string, bio: string) => {
    try {
        if (!name || !bio) {
            return { success: false, message: "Name and bio are required" };
        }

        const [result]: any = await pool.execute(
            "UPDATE authors SET name = ?, bio = ? WHERE id = ?",
            [name, bio, id]
        );

        if (result.affectedRows === 0) {
            return { success: false, message: "Author not found" };
        }

        return { success: true, message: "Author updated successfully" };
    } catch (error) {
        console.error("Update author error:", error);
        return { success: false, message: "Database error" };
    }
};

export const deleteAuthor = async (id: number) => {
    try {
        // Check if the author has books
        const [books]: any = await pool.execute("SELECT id FROM books WHERE author_id = ?", [id]);
        if (books.length > 0) {
            return { success: false, message: "Cannot delete author. This author has books." };
        }

        const [result]: any = await pool.execute("DELETE FROM authors WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return { success: false, message: "Author not found" };
        }

        return { success: true, message: "Author deleted successfully" };
    } catch (error) {
        console.error("Delete author error:", error);
        return { success: false, message: "Database error" };
    }
};
