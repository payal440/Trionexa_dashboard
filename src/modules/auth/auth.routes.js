import express from "express";
import { registerUser, loginUser , refreshAcessToken} from "./auth.controller.js";
import { registerSchema, loginSchema, validate } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh", refreshAcessToken);

export default router;