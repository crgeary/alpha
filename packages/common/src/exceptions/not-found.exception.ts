import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http-exception.exception";

export class NotFoundException extends HttpException {
    name = "NotFoundException";

    constructor(message?: string, public meta?: Record<string, any>) {
        super(HttpStatus.NOT_FOUND, message, meta);
    }
}
