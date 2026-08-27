import express from "express";
import { registerUser, loginUser , refreshAcessToken, getAllUsers,getProfile, logoutUser} from "./auth.controller.js";
import { registerSchema, loginSchema,refreshTokenSchema } from "./auth.validation.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import authorizeRoles from "../../../middlewares/role.middleware.js";
import { validate } from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh", validate(refreshTokenSchema), refreshAcessToken);
router.get("/profile", authMiddleware, getProfile);
router.get("/users", authMiddleware, authorizeRoles("ADMIN"), getAllUsers);
router.post("/logout", authMiddleware, logoutUser);

export default router;