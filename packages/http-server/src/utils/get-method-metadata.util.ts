import { HttpStatus } from "@alpha/common";
import { HTTP_CODE_METADATA, HTTP_METHOD_METADATA, PATH_METADATA } from "../constants";
import { HttpMethodList } from "../enums";

type MethodMetadata = {
    method: HttpMethodList;
    statusCode: HttpStatus;
    path: string;
};

export function getMethodMetadata(func: Function): MethodMetadata {
    return {
        method: Reflect.getMetadata(HTTP_METHOD_METADATA, func) || "get",
        statusCode: Reflect.getMetadata(HTTP_CODE_METADATA, func) || HttpStatus.OK,
        path: Reflect.getMetadata(PATH_METADATA, func) || "/",
    };
}
