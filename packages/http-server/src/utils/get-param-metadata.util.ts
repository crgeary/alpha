import { PARAM_METADATA } from "../constants";
import { ParamType } from "../enums/param-type.enum";

type Param = {
    paramType: ParamType;
    index: number;
    name: string | undefined;
};

type ParamMetadata = Param[];

export function getParamMetadata(target: object, method: string): ParamMetadata {
    return Reflect.getMetadata(PARAM_METADATA, target, method) || [];
}
