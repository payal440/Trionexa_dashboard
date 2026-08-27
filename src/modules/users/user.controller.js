import { createUser } from "./user.services.js";

export const createUserController = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const normalizedRole = role?.toUpperCase();
        const user = await createUser({
            name,
            email,
            password,
            role: normalizedRole,
            agencyId: req.user.agencyId,
        });
        return res.status(201).json({
            success: true,
            Message: "user created sucessfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

