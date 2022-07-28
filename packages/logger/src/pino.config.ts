import { NodeEnv } from "@alpha/common";
import { LoggerOptions } from "pino";

const prettyTransport = {
    target: "pino-pretty",
    options: {
        colorize: true,
        ignore: "pid,hostname",
    },
};

const nullTransport = {
    targets: [],
};

export const config: Record<NodeEnv, LoggerOptions> = {
    development: {
        transport: prettyTransport,
    },
    test: {
        transport: prettyTransport,
    },
    production: {
        transport: nullTransport,
    },
};
