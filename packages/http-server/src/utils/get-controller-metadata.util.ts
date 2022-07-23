import { Class } from "type-fest";
import { PATH_METADATA } from "../constants";

type ControllerMetadata = {
    path: string;
};

export function getControllerMetadata(controller: Class<unknown>): ControllerMetadata {
    return {
        path: Reflect.getMetadata(PATH_METADATA, controller) || "/",
    };
}
