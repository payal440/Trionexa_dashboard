import bcrypt from "bcryptjs";
import prisma from "../../../config/db.js";
import { generateToken } from "./auth.utils.js";

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
                role: "SPECIALIST",
            },
        });
        return {
            agency,
            newUser
        }
    });

    const token = generateToken(result.newUser);

    return {
        token,
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

        const token = generateToken(user);
        return {
            token,
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
