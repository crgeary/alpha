import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http-exception.exception";

export class UnauthorizedException extends HttpException {
    name = "UnauthorizedException";

    constructor(message?: string, public meta?: Record<string, any>) {
        super(HttpStatus.UNAUTHORIZED, message, meta);
    }
}
