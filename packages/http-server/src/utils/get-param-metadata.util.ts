import { PARAM_METADATA } from "../constants";
import { Param } from "../types/param.type";

type ParamMetadata = Param[];

export function getParamMetadata(target: object, method: string): ParamMetadata {
    return Reflect.getMetadata(PARAM_METADATA, target, method) || [];
}
