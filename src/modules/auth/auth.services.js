import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../config/db.js";
import { generateAcessToken , generateRefreshToken } from "./auth.utils.js";

const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.jwt_refresh_secret;
 

export const registerUser = async ({
    agencyName,
    name,
    email,
    password
}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
        const agency = await tx.agency.create({
            data: {
                name: agencyName,
            },
        });
        const newUser = await tx.user.create({
            data: {
                agencyId: agency.id,
                name,
                email,
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        return {
            agency,
            newUser
        }
    });

    const accessToken = generateAcessToken(result.newUser);
    const refreshToken = generateRefreshToken(result.newUser);

    return {
        accessToken,
        refreshToken,
        user: {
            id: result.newUser.id,
            name: result.newUser.name,
            email: result.newUser.email,
            role: result.newUser.role,
            agencyId: result.newUser.agencyId,
        },
        agency: {
            id: result.agency.id,
            name: result.agency.name,
        },
    };
};

    export const loginUser = async ({email, password}) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                agency: true,
            },
        });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        const accessToken = generateAcessToken(user);
        const refreshToken = generateRefreshToken(user);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                agencyId: user.agencyId,
            },
            agency: {
                id: user.agency.id,
                name: user.agency.name,
            },
        };
    };
    export const refreshAcessToken = async (refreshToken) => {
        if(!refreshToken){
            throw new Error("Refresh token is required");
        }
        try{
            const decoded = jwt.verify(refreshToken, refreshSecret);
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.userId,
                },
            });
            if(!user){
                throw new Error("User not found");
            }
            const accessToken = generateAcessToken(user);
            return {
                accessToken
            };
        }catch(err){
            throw new Error("Invalid refresh token");
        };
    }

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            agencyId: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getProfile = async (user) => {
    const profile = await prisma.user.findUnique({
        where: {
            id: user.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            agencyId: true,
            createdAt: true,
        },
    });
    return profile;

}
export const logoutUser = async () => {
    // Invalidate the refresh token in your database or token store
    // For example, you can delete the refresh token associated with the user
    return true;
};
