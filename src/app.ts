import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/books.routes";
import authorRoutes from "./routes/authors.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.get("/", (req, res) => {
    res.send("Library API is running...");
});

export default app;
