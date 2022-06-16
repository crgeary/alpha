import jwt from "jsonwebtoken";
import ms from "ms";

export const createAccessToken = (userId: string) => {
    const iat = Math.floor(Date.now() / 1000);
    const expiresIn = ms("1h") / 1000;

    return jwt.sign({ iat }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        subject: userId,
        expiresIn,
    });
};
