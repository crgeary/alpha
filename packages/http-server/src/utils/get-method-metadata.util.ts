import { HTTP_METHOD_METADATA, PATH_METADATA } from "../constants";
import { HttpMethodList } from "../enums";

type MethodMetadata = {
    method: HttpMethodList;
    path: string;
};

export function getMethodMetadata(func: Function): MethodMetadata {
    return {
        method: Reflect.getMetadata(HTTP_METHOD_METADATA, func) || "get",
        path: Reflect.getMetadata(PATH_METADATA, func) || "/",
    };
}
