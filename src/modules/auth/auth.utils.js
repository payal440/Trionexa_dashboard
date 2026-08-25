import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ 
        userId : user.id,
        agencyId : user.agencyId,
        role : user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
);
}