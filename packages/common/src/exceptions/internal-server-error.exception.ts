import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http-exception.exception";

export class InternalServerErrorException extends HttpException {
    name = "InternalServerErrorException";

    constructor(message?: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}
