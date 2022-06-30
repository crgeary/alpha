import { isEnv } from "@alpha/common";
import { CookieOptions } from "express";

export const getAuthCookieOptions = (options: CookieOptions) => {
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        path: "/",
        sameSite: isEnv("production") ? "strict" : "lax",
        secure: isEnv("production"),
        ...options,
    };

    return cookieOptions;
};
