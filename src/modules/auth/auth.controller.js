
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    refreshAcessToken as refreshAcessTokenService,
    getAllUsers as getAllUsersService,
    getProfile as getProfileService,
    logoutUser as logoutUserService
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
export const getAllUsers = async (req, res,next) => {
    try{
        const users = await getAllUsersService();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }catch(error){
        next(error);
    }
}
export const getProfile = async (req, res,next) => {
    try{
        const user = await getProfileService(req.user);
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: user,
        });
    }catch(error){
        next(error);
    }
}
export const logoutUser = async (req, res,next) => {
    try{
        await logoutUserService(req.user.id);
        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    }catch(error){
        next(error);
    }
}
export default {
    registerUser,
    loginUser,
    refreshAcessToken,
    getAllUsers,
    getProfile,
    logoutUser
}
