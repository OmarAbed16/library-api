import Database from "../config/db";

class AuthorService {


    private isValidString(str: string, maxLength: number): boolean {
        return !!str && str.trim().length > 0 && str.length <= maxLength;
    }


    async getAuthors() {
        try {
            const [authors]: any = await Database.execute("SELECT id, name, email, bio FROM authors where is_deleted=?",[0]);
            return { success: true, authors };
        } catch (error) {
            console.error("Get authors error:", error);
            return { success: false, message: "Database error" };
        }
    }

    async updateAuthor(id: number, name: string, bio: string) {
        try {
            if (!name || !bio) {
                return { success: false, message: "Name and bio are required" };
            }


            if (!this.isValidString(name, 255) || !this.isValidString(bio, 500)) {
                return { success: false, message: "Name and Bio must be non-empty and within character limits" };
            }


            const [result]: any = await Database.execute(
                "UPDATE authors SET name = ?, bio = ? WHERE id = ? and is_deleted=?",
                [name, bio, id,0]
            );

            if (result.affectedRows === 0) {
                return { success: false, message: "Author not found" };
            }

            return { success: true, message: "Author updated successfully" };
        } catch (error) {
            console.error("Update author error:", error);
            return { success: false, message: "Database error" };
        }
    }

    async deleteAuthor(id: number) {
        try {
            // Check if the author has books
            const [books]: any = await Database.execute("SELECT id FROM books WHERE author_id = ? and is_deleted=?", [id,0]);
            if (books.length > 0) {
                return { success: false, message: "Cannot delete author. This author has books." };
            }

            const [result]: any = await Database.execute("UPDATE authors SET is_deleted=? WHERE id = ? and is_deleted=?", [1,id,0]);

            if (result.affectedRows === 0) {
                return { success: false, message: "Author not found" };
            }

            return { success: true, message: "Author deleted successfully" };
        } catch (error) {
            console.error("Delete author error:", error);
            return { success: false, message: "Database error" };
        }
    }
}

export default new AuthorService();
