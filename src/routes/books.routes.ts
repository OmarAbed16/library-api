import express from "express";
import BookController from "../controllers/books.controller";
import  AuthMiddleware  from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", AuthMiddleware.authenticateJWT, BookController.createBook.bind(BookController));
router.get("/", AuthMiddleware.authenticateJWT, BookController.listBooks.bind(BookController));
router.put("/:id", AuthMiddleware.authenticateJWT, BookController.editBook.bind(BookController));
router.delete("/:id", AuthMiddleware.authenticateJWT, BookController.removeBook.bind(BookController));

export default router;
