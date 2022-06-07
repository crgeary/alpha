import "reflect-metadata";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ContainerProvider } from "../lib/container/context";
import { container } from "../lib/container/container";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: "light",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <ContainerProvider container={container}>
                <Component {...pageProps} />
            </ContainerProvider>
        </MantineProvider>
    );
}
