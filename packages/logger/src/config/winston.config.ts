import { NodeEnv } from "@alpha/common";
import { format, LoggerOptions, transports } from "winston";
import { RollbarTransport } from "../transports/rollbar.transport";
import { logLevels } from "./log-levels.config";

export const defaultWinstonConfig: LoggerOptions = {
    format: format.json(),
    levels: logLevels.levels,
};

export const winstonConfig: Record<NodeEnv, LoggerOptions> = {
    development: {
        ...defaultWinstonConfig,
        level: "debug",
        transports: [
            new transports.Console({
                format: format.combine(format.colorize(), format.simple()),
            }),
            new RollbarTransport({
                level: "warning",
                format: format.json(),
            }),
        ],
    },
    test: {
        ...defaultWinstonConfig,
    },
    production: {
        ...defaultWinstonConfig,
    },
};
