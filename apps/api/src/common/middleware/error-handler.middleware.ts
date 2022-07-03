import { HttpException, HttpStatus, isEnv, UnprocessableEntityException } from "@alpha/common";
import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";

const isValidationError = (
    err: unknown,
): err is BadRequestError & { errors: ValidationError[] } => {
    return err instanceof BadRequestError && "errors" in err;
};

@Service()
@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, _: Request, res: Response, next: NextFunction) {
        const err = this.transformError(error);

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

    transformError(err: Error) {
        if (isValidationError(err)) {
            return new UnprocessableEntityException("Validation error", {
                errors: err.errors.map((err) => ({
                    name: err.property,
                    messages: err.constraints ? Object.values(err.constraints) : [],
                })),
            });
        }
        return err;
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
