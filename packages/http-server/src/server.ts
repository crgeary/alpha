import { Express, NextFunction, Request, Response, Router } from "express";
import path from "path";
import { Class } from "type-fest";
import { InvalidMetadataLabel } from "./exceptions/invalid-metadata-label.exception";
import { getControllerMetadata } from "./utils/get-controller-metadata.util";
import { getMethodMetadata } from "./utils/get-method-metadata.util";
import { getMethods } from "./utils/get-methods.util";
import { getParamMetadata } from "./utils/get-param-metadata.util";
import { getParam } from "./utils/get-param.util";
import { isController } from "./utils/is-controller.util";

type UseExpressServerOptions = {
    controllers: Class<unknown>[];
};

export function useExpressServer(app: Express, options: UseExpressServerOptions) {
    const router = Router();

    options.controllers.forEach((controller) => {
        if (!isController(controller)) {
            throw new InvalidMetadataLabel(
                `Controller '${controller.name}' is not decorated with @Controller()`,
            );
        }

        const methods = getMethods(controller.prototype);
        const controllerMetadata = getControllerMetadata(controller);

        methods.forEach((method) => {
            const methodMetadata = getMethodMetadata(controller.prototype[method]);
            const routerPath = path.join(controllerMetadata.path, methodMetadata.path);

            const handler = (req: Request, res: Response, next: NextFunction) => {
                const paramMetadata = getParamMetadata(controller, method);

                const args = paramMetadata.reduce((acc, curr) => {
                    acc[curr.index] = getParam(req, res, next, curr.paramType, curr.name);
                    return acc;
                }, [] as unknown[]);

                return controller.prototype[method].apply(controller, args);
            };

            router[methodMetadata.method](routerPath, handler);
        });
    });

    app.use("/", router);
}
