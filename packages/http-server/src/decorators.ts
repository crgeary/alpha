import { HttpStatus } from "@alpha/common";
import {
    CONTROLLER_LABEL,
    HTTP_CODE_METADATA,
    HTTP_METHOD_METADATA,
    PATH_METADATA,
} from "./constants";
import { HttpMethod as HttpMethodEnum } from "./enums";

export function Controller(path: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(CONTROLLER_LABEL, true, target);
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}

export function HttpCode(code: HttpStatus): MethodDecorator {
    return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(HTTP_CODE_METADATA, code, descriptor.value);
        return descriptor;
    };
}

function httpMethodFactory(method: HttpMethodEnum) {
    return (path: string): MethodDecorator => {
        return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
            Reflect.defineMetadata(HTTP_METHOD_METADATA, method, descriptor.value);
            Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
            return descriptor;
        };
    };
}

export const Get = httpMethodFactory(HttpMethodEnum.Get);
export const Post = httpMethodFactory(HttpMethodEnum.Post);
export const Put = httpMethodFactory(HttpMethodEnum.Put);
export const Patch = httpMethodFactory(HttpMethodEnum.Patch);
export const Delete = httpMethodFactory(HttpMethodEnum.Delete);
export const Head = httpMethodFactory(HttpMethodEnum.Head);
export const Options = httpMethodFactory(HttpMethodEnum.Options);
export const All = httpMethodFactory(HttpMethodEnum.All);
