import { HttpException, HttpStatus, isEnv } from "@app/common";
import { NextFunction, Request, Response } from "express";
import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(err: Error, _: Request, res: Response, next: NextFunction) {
        const status =
            err instanceof HttpException ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

        res.status(status).json({
            errors: [
                {
                    status,
                    name: err.name,
                    message: err.message || undefined,
                    code: undefined,
                    stack: isEnv("development") ? this.parseStackTrace(err.stack) : undefined,
                },
            ],
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
