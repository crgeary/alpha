import { PARAM_METADATA } from "../constants";
import { ParamType } from "../enums/param-type.enum";
import { getParamMetadata } from "../utils/get-param-metadata.util";

function appendMetadata(target: object, value: any, key: string) {
    const current = getParamMetadata(target, String(key));
    current.push(value);
    Reflect.defineMetadata(PARAM_METADATA, current, target, key);
}

function paramFactory(paramType: ParamType) {
    return (): ParameterDecorator => {
        return (target, key, index) => {
            appendMetadata(target.constructor, { paramType, index }, String(key));
        };
    };
}

function paramFactoryWithName(paramType: ParamType) {
    return (name?: string): ParameterDecorator => {
        return (target, key, index) => {
            appendMetadata(target.constructor, { paramType, index, name }, String(key));
        };
    };
}

export const Req = paramFactory(ParamType.Request);
export const Res = paramFactory(ParamType.Response);
export const Next = paramFactory(ParamType.Next);

export const Params = paramFactoryWithName(ParamType.Params);
export const Query = paramFactoryWithName(ParamType.Query);
export const Body = paramFactoryWithName(ParamType.Body);
export const Headers = paramFactoryWithName(ParamType.Headers);
export const Cookies = paramFactoryWithName(ParamType.Cookies);
