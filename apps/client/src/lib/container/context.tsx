import { interfaces } from "inversify";
import { createContext, FC, PropsWithChildren } from "react";

export const ContainerContext = createContext<{
    container: interfaces.Container | null;
}>({
    container: null,
});

type ProviderProps = PropsWithChildren<{
    container: interfaces.Container;
}>;

export const ContainerProvider: FC<ProviderProps> = ({ container, children }) => (
    <ContainerContext.Provider value={{ container }}>{children}</ContainerContext.Provider>
);
