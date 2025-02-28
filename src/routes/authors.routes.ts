import express from "express";
import AuthorController from "../controllers/authors.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", AuthMiddleware.authenticateJWT, AuthorController.listAuthors.bind(AuthorController));
router.put("/:id", AuthMiddleware.authenticateJWT, AuthorController.editAuthor.bind(AuthorController));
router.delete("/:id", AuthMiddleware.authenticateJWT, AuthorController.removeAuthor.bind(AuthorController));

export default router;
