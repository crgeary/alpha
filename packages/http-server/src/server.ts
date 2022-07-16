import { Express, Router } from "express";
import path from "path";
import { Class } from "type-fest";
import { getControllerMetadata } from "./utils/get-controller-metadata.util";
import { getMethodMetadata } from "./utils/get-method-metadata.util";
import { getMethods } from "./utils/get-methods.util";
import { isController } from "./utils/is-controller.util";

type UseExpressServerOptions = {
    controllers: Class<unknown>[];
};

export function useExpressServer(app: Express, options: UseExpressServerOptions) {
    const router = Router();

    options.controllers.forEach((controller) => {
        if (!isController(controller)) {
            console.error("Skipping, not a controller");
            return;
        }

        const methods = getMethods(controller.prototype);
        const controllerMetadata = getControllerMetadata(controller);

        methods.forEach((method) => {
            const methodMetadata = getMethodMetadata(controller.prototype[method]);
            const routerPath = path.join(controllerMetadata.path, methodMetadata.path);
            router[methodMetadata.method](routerPath, controller.prototype[method]);
        });
    });

    app.use("/", router);
}
