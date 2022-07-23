import { ParamType } from "../enums/param-type.enum";

export type Param = {
    paramType: ParamType;
    index: number;
    name?: string;
};
