import { useContext, useMemo } from "react";
import { isNull } from "lodash";
import { ApplicationError } from "../errors/ApplicationError";
import { ContainerContext } from "./context";
import { interfaces } from "inversify";

export const useContainer = () => {
    const { container } = useContext(ContainerContext);
    if (isNull(container)) {
        throw new ApplicationError();
    }
    return container;
};

export const useService = <T>(id: interfaces.ServiceIdentifier<T>) => {
    const container = useContainer();
    return useMemo(() => container.get<T>(id), [container, id]);
};
