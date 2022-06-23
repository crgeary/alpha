import ms from "ms";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../../db";
import { RefreshTokenStatus } from "@prisma/client";
import { isNil, isObject } from "lodash";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/jwt.type";
import { JWT_ACCESS_TOKEN_LIFETIME, JWT_REFRESH_TOKEN_LIFETIME } from "../constants";

@Service()
export class JwtService {
    createAccessToken = (userId: string) => {
        const iat = Math.floor(Date.now() / 1000);
        const expiresIn = ms(JWT_ACCESS_TOKEN_LIFETIME) / 1000;

        return jwt.sign({ iat }, process.env.JWT_ACCESS_TOKEN_SECRET, {
            subject: userId,
            expiresIn,
        });
    };

    async createRefreshToken(userId: string) {
        const iat = Math.floor(Date.now() / 1000);
        const expiresIn = ms(JWT_REFRESH_TOKEN_LIFETIME) / 1000;
        const id = uuidv4();

        const token = jwt.sign({ iat }, process.env.JWT_REFRESH_TOKEN_SECRET, {
            subject: userId,
            jwtid: id,
            expiresIn,
        });

        await prisma.refreshToken.create({
            data: {
                userId,
                jwtId: id,
                expiresAt: new Date((iat + expiresIn) * 1000),
                status: RefreshTokenStatus.ACTIVE,
            },
        });

        return token;
    }

    async revokeRefreshToken(jwtPayload: { jti: string; sub: string }) {
        await prisma.refreshToken.updateMany({
            where: {
                jwtId: jwtPayload.jti,
                userId: jwtPayload.sub,
            },
            data: {
                status: RefreshTokenStatus.REVOKED,
            },
        });
    }

    async verifyAccessToken(token: string) {
        try {
            const payload = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

            if (!isObject(payload) || isNil(payload.exp) || isNil(payload.sub)) {
                throw new JsonWebTokenError("Invalid token");
            }

            return payload as AccessTokenPayload;
        } catch (err) {
            if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
                return null;
            }

            throw err;
        }
    }

    async verifyRefreshToken(token: string) {
        try {
            const payload = await jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

            if (
                !isObject(payload) ||
                isNil(payload.exp) ||
                isNil(payload.sub) ||
                isNil(payload.jti)
            ) {
                throw new JsonWebTokenError("Invalid token");
            }

            return payload as RefreshTokenPayload;
        } catch (err) {
            if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
                return null;
            }

            throw err;
        }
    }

    async createAuthTokens(userId: string) {
        return {
            accessToken: this.createAccessToken(userId),
            refreshToken: await this.createRefreshToken(userId),
        };
    }
}
