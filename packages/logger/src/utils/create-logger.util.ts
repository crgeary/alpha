import { winstonConfig } from "../config/winston.config";
import { LoggerException } from "../exceptions/logger.exception";
import { LoggerService } from "../services/logger.service";
import { LoggerOptions } from "../types/logger-options.type";

export function createLogger(options: LoggerOptions) {
    if (!winstonConfig[options.environment]) {
        throw new LoggerException(
            `Unknown environment [${options.environment}] provided to @alpha/logger`,
        );
    }

    const logger = new LoggerService({
        ...winstonConfig[options.environment],
    });

    return {
        logger,
    };
}
