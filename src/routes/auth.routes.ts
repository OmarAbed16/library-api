import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", (req, res) => AuthController.registerAuthor(req, res));
router.post("/login", (req, res) => AuthController.loginAuthor(req, res));

export default router;
