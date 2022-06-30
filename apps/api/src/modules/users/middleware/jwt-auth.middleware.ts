import { UnauthorizedException } from "@alpha/common";
import { NextFunction, Request, Response } from "express";
import ms from "ms";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { JWT_ACCESS_TOKEN_LIFETIME, JWT_REFRESH_TOKEN_LIFETIME } from "../constants";
import { JwtService } from "../services/jwt.service";
import { getAuthCookieOptions } from "../utils/cookie.util";

@Service()
export class JwtAuthMiddleware implements ExpressMiddlewareInterface {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { accessToken, refreshToken } = this.getTokensFromRequest(req);

        if (!accessToken && !refreshToken) {
            throw new UnauthorizedException();
        }

        if (accessToken && (await this.jwtService.verifyAccessToken(accessToken))) {
            return next();
        }

        if (refreshToken) {
            const verifiedRefreshToken = await this.jwtService.verifyRefreshToken(refreshToken);

            if (verifiedRefreshToken) {
                await this.jwtService.revokeRefreshToken(verifiedRefreshToken);
                const tokens = await this.jwtService.createAuthTokens(verifiedRefreshToken.sub);

                res.cookie(
                    "auth.at",
                    tokens.accessToken,
                    getAuthCookieOptions({
                        maxAge: ms(JWT_ACCESS_TOKEN_LIFETIME),
                    }),
                ).cookie(
                    "auth.rt",
                    tokens.refreshToken,
                    getAuthCookieOptions({
                        maxAge: ms(JWT_REFRESH_TOKEN_LIFETIME),
                    }),
                );

                return next();
            }
        }

        throw new UnauthorizedException();
    }

    getTokensFromRequest(req: Request) {
        const { "auth.at": accessToken, "auth.rt": refreshToken }: Record<string, string> =
            req.cookies;
        return {
            accessToken: accessToken || null,
            refreshToken: refreshToken || null,
        };
    }
}
