import pino from "pino";
import { LoggerException } from "../exceptions/logger.exception";
import { config } from "../pino.config";
import { LoggerOptions } from "../types/logger-options.type";

export function createLogger(options: LoggerOptions) {
    if (!config[options.environment]) {
        throw new LoggerException(
            `Unknown environment [${options.environment}] provided to @alpha/logger`,
        );
    }

    const logger = pino({
        ...config[options.environment],
        mixin() {
            return {
                name: options.name || "unknown",
                _env: options.environment || "unknown",
            };
        },
    });

    return {
        logger,
    };
}
