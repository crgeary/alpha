import { Class } from "type-fest";
import { PARAM_METADATA } from "../constants";
import { ParamType } from "../enums/param-type.enum";

type Param = {
    paramType: ParamType;
    index: number;
    name: string;
};

type ParamMetadata = Param[];

export function getParamMetadata(controller: Class<unknown>, method: string): ParamMetadata {
    return Reflect.getMetadata(PARAM_METADATA, controller, method) || [];
}
