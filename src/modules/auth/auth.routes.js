import express from "express";
import { registerUser, loginUser } from "./auth.controller.js";
import { registerSchema, loginSchema, validate } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;