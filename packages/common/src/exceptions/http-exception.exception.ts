import { HttpStatus } from "../enums/http-status.enum";

export class HttpException extends Error {
    name = "HttpException";

    constructor(
        public readonly statusCode: HttpStatus,
        message?: string,
        public meta?: Record<string, any>,
    ) {
        super(message);
    }
}
