import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http-exception.exception";

export class UnprocessableEntityException extends HttpException {
    name = "UnprocessableEntityException";

    constructor(message?: string, public meta?: Record<string, any>) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message, meta);
    }
}
