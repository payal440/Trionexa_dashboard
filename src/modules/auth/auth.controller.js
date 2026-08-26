
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    refreshAcessToken as refreshAcessTokenService
} from "./auth.services.js";


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
export const refreshAcessToken = async (req, res,next) => {
    try{
        const { refreshToken } = req.body;
        const result = await refreshAcessTokenService(refreshToken);
        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: result,
        });
    }catch(error){
        next(error);
    }
}
export default {
    registerUser,
    loginUser,
    refreshAcessToken
}
