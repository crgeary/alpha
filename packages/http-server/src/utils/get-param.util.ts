import { NextFunction, Request, Response } from "express";
import { ParamType } from "../enums/param-type.enum";

export function getParam(
    req: Request,
    res: Response,
    next: NextFunction,
    type: ParamType,
    name?: string,
) {
    switch (type) {
        case ParamType.Request:
            return req;
        case ParamType.Response:
            return res;
        case ParamType.Next:
            return next;
        case ParamType.Params:
            return name ? req.params[name] : req.params;
        case ParamType.Query:
            return name ? req.query[name] : req.query;
        case ParamType.Headers:
            return name ? req.headers[name] : req.headers;
        case ParamType.Cookies:
            return name ? req.cookies[name] : req.cookies;
        default:
            return undefined;
    }
}
