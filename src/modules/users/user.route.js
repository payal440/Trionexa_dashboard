import express from "express";
import { createUserController } from "./user.controller.js";

import authorizeroles from "../../../middlewares/role.middleware.js";
import authmiddleware from "../../../middlewares/auth.middleware.js";


import { validate } from "../../../middlewares/validate.middleware.js";
import { createUserSchema } from "./user.validation.js";
const router = express.Router();

router.post("/",authmiddleware,
    authorizeroles("ADMIN"),
    validate(createUserSchema),
    createUserController
);
export default router;