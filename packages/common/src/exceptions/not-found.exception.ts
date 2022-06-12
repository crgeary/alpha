import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http-exception.exception";

export class NotFoundException extends HttpException {
    name = "NotFoundException";

    constructor(message?: string) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
