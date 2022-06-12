import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http-exception.exception";

export class UnprocessableEntityException extends HttpException {
    name = "UnprocessableEntityException";

    constructor(message?: string) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message);
    }
}
