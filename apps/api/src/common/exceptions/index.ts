import {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    NotAcceptableError,
    InternalServerError,
} from "routing-controllers";

export {
    BadRequestError as BadRequestException,
    UnauthorizedError as UnauthorizedException,
    ForbiddenError as ForbiddenException,
    NotFoundError as NotFoundException,
    MethodNotAllowedError as MethodNotAllowedException,
    NotAcceptableError as NotAcceptableException,
    InternalServerError as InternalServerException,
};
