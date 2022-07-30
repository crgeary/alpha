import { HttpException, HttpStatus, UnprocessableEntityException } from "@alpha/common";
import { Middleware } from "@alpha/http-server";
import { NextFunction, Request, Response } from "express";

@Middleware()
export class ErrorHandlerMiddleware {
    error(err: Error, _: Request, res: Response, next: NextFunction) {
        const status =
            err instanceof HttpException ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

        res.status(status).json({
            error: {
                status,
                name: err.name,
                message: err.message || undefined,
                meta: {
                    properties:
                        err instanceof UnprocessableEntityException ? err.meta?.errors : undefined,
                },
            },
        });

        next();
    }
}
