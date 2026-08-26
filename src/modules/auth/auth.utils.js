import jwt from "jsonwebtoken";

export const generateAcessToken = (user) => {
    return jwt.sign({ 
        userId : user.id,
        agencyId : user.agencyId,
        role : user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
);
};
export const generateRefreshToken = (user) => {
    return jwt.sign({
        userId : user.id,
        agencyId : user.agencyId,
        role : user.role
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
);
};