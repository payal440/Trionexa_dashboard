
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
} from "./auth.services.js";

import { registerSchema, loginSchema } from "./auth.validation.js";

export const registerUser = async (req, res,next) => {
    try{
          
        const result = await registerUserService(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }catch(error){
        next(error);
    }
};

export const loginUser = async (req, res,next) => {
    try{
        const result = await loginUserService(req.body);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    }catch(error){
        next(error);
    }
}
export default {
    registerUser,
    loginUser
}