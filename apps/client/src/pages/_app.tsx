import "reflect-metadata";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { ContainerProvider } from "../lib/container/context";
import { container } from "../lib/container/container";

import "@fontsource/inter/variable.css";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <ContainerProvider container={container}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools />
                </Hydrate>
            </QueryClientProvider>
        </ContainerProvider>
    );
}
