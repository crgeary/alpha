import { HTTP_METHOD_METADATA, PATH_METADATA } from "../constants";
import { HttpMethod } from "../enums";

function httpMethodFactory(method: HttpMethod) {
    return (path: string): MethodDecorator => {
        return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
            Reflect.defineMetadata(HTTP_METHOD_METADATA, method, descriptor.value);
            Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
            return descriptor;
        };
    };
}

export const Get = httpMethodFactory(HttpMethod.Get);
export const Post = httpMethodFactory(HttpMethod.Post);
export const Put = httpMethodFactory(HttpMethod.Put);
export const Patch = httpMethodFactory(HttpMethod.Patch);
export const Delete = httpMethodFactory(HttpMethod.Delete);
export const Head = httpMethodFactory(HttpMethod.Head);
export const Options = httpMethodFactory(HttpMethod.Options);
export const All = httpMethodFactory(HttpMethod.All);
