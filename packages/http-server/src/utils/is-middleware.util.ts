import { Class } from "type-fest";
import { MIDDLEWARE_LABEL } from "../constants";

export function isMiddleware(middleware: Class<unknown>) {
    return Reflect.hasMetadata(MIDDLEWARE_LABEL, middleware);
}
