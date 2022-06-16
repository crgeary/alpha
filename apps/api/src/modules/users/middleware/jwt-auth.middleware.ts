import { UnauthorizedException } from "@app/common";
import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class JwtAuthMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction) {
        const { auth } = req.cookies;

        if (!auth) {
            throw new UnauthorizedException();
        }

        // Todo, verify the auth/accessToken

        next();
    }
}
