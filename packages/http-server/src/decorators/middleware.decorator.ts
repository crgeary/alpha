import { decorate, injectable } from "inversify";
import { MIDDLEWARE_LABEL } from "../constants";

export function Middleware(): ClassDecorator {
    return (target) => {
        decorate(injectable(), target);
        Reflect.defineMetadata(MIDDLEWARE_LABEL, true, target);
    };
}
