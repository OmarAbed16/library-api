import express from "express";
import { listAuthors, editAuthor, removeAuthor } from "../controllers/authors.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateJWT, listAuthors);
router.put("/:id", authenticateJWT, editAuthor);
router.delete("/:id", authenticateJWT, removeAuthor);

export default router;
