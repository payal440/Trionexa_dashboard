import express from "express";
import { createUserController } from "./user.controller.js";

import authorizeroles from "../../../middlewares/role.middleware.js";
import authmiddleware from "../../../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/",authmiddleware,
    authorizeroles("ADMIN"),
    createUserController
);
export default router;