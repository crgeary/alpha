import { HttpException, HttpStatus, isEnv, UnprocessableEntityException } from "@alpha/common";
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
                stack: isEnv("development") ? this.parseStackTrace(err.stack) : undefined,
            },
        });

        next();
    }

    parseStackTrace(stack: string | undefined) {
        if (!stack) {
            return null;
        }

        const lines = stack.split("\n");

        return lines
            .map((line) => {
                const segments =
                    /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i.exec(
                        line,
                    );
                return segments
                    ? {
                          file: segments[2],
                          methodName: segments[1] || "<unknown>",
                          arguments: [],
                          lineNumber: +segments[3],
                          column: segments[4] ? +segments[4] : null,
                      }
                    : null;
            })
            .filter((line) => line !== null);
    }
}
