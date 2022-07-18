import { CONTROLLER_LABEL, PATH_METADATA } from "../constants";

export function Controller(path?: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(CONTROLLER_LABEL, true, target);
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}
