import { HttpStatus } from "@alpha/common";
import { HTTP_CODE_METADATA } from "../constants";

export function HttpCode(code: HttpStatus): MethodDecorator {
    return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(HTTP_CODE_METADATA, code, descriptor.value);
        return descriptor;
    };
}
