import { Class } from "type-fest";
import { CONTROLLER_LABEL } from "../constants";

export function isController(controller: Class<unknown>) {
    return Reflect.hasMetadata(CONTROLLER_LABEL, controller);
}
