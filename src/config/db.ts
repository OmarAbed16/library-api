import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

class Database {
    private static instance: Database;
    private pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS || "",
            database: process.env.DB_NAME,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async execute(query: string, params: any[] = []): Promise<any> {
        try {
            const [results] = await this.pool.execute(query, params);
            return [results];
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    }
}

export default Database.getInstance();
