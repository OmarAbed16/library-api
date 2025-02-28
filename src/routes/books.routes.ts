import express from "express";
import { createBook, listBooks, editBook, removeBook } from "../controllers/books.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticateJWT, createBook);
router.get("/", authenticateJWT, listBooks);
router.put("/:id", authenticateJWT, editBook);
router.delete("/:id", authenticateJWT, removeBook);

export default router;
