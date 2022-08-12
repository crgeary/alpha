import { NodeEnv } from "@alpha/common";
import { LoggerOptions } from "pino";

const prettyTransport = {
    target: "pino-pretty",
    options: {
        colorize: true,
        ignore: "pid,hostname",
    },
};

export const config: Record<NodeEnv, LoggerOptions> = {
    development: {
        transport: prettyTransport,
    },
    test: {
        transport: prettyTransport,
    },
    production: {},
};
