import winston, { createLogger, LoggerOptions } from "winston";
import { logLevels } from "../config/log-levels.config";
import { LogLevel } from "../types/log-level.type";
import { LogPayload } from "../types/log-payload.type";

winston.addColors(logLevels.colors);

export class LoggerService {
    private instance;

    constructor(options: LoggerOptions) {
        this.instance = createLogger(options);
    }

    debug(message: string, error?: Error, payload?: LogPayload): this;
    debug(message: string, payload?: Error | LogPayload): this;
    debug(error: Error, payload?: LogPayload): this;
    debug(payload: LogPayload): this;
    debug(
        messageOrErrorOrPayload: string | Error | LogPayload,
        errorOrPayload?: Error | LogPayload,
        payload?: LogPayload,
    ) {
        return this.logz("debug", messageOrErrorOrPayload, errorOrPayload, payload);
    }

    info(message: string, error?: Error, payload?: LogPayload): this;
    info(message: string, payload?: Error | LogPayload): this;
    info(error: Error, payload?: LogPayload): this;
    info(payload: LogPayload): this;
    info(
        messageOrErrorOrPayload: string | Error | LogPayload,
        errorOrPayload?: Error | LogPayload,
        payload?: LogPayload,
    ) {
        return this.logz("info", messageOrErrorOrPayload, errorOrPayload, payload);
    }

    warning(message: string, error?: Error, payload?: LogPayload): this;
    warning(message: string, payload?: Error | LogPayload): this;
    warning(error: Error, payload?: LogPayload): this;
    warning(payload: LogPayload): this;
    warning(
        messageOrErrorOrPayload: string | Error | LogPayload,
        errorOrPayload?: Error | LogPayload,
        payload?: LogPayload,
    ) {
        return this.logz("warning", messageOrErrorOrPayload, errorOrPayload, payload);
    }

    error(message: string, error?: Error, payload?: LogPayload): this;
    error(message: string, payload?: Error | LogPayload): this;
    error(error: Error, payload?: LogPayload): this;
    error(payload: LogPayload): this;
    error(
        messageOrErrorOrPayload: string | Error | LogPayload,
        errorOrPayload?: Error | LogPayload,
        payload?: LogPayload,
    ) {
        return this.logz("error", messageOrErrorOrPayload, errorOrPayload, payload);
    }

    critical(message: string, error?: Error, payload?: LogPayload): this;
    critical(message: string, payload?: Error | LogPayload): this;
    critical(error: Error, payload?: LogPayload): this;
    critical(payload: LogPayload): this;
    critical(
        messageOrErrorOrPayload: string | Error | LogPayload,
        errorOrPayload?: Error | LogPayload,
        payload?: LogPayload,
    ) {
        return this.logz("critical", messageOrErrorOrPayload, errorOrPayload, payload);
    }

    private logz<A = string, B = Error | undefined, C = LogPayload | undefined>(
        level: LogLevel,
        message: A,
        error?: B,
        payload?: C,
    ): this;
    private logz<A = string, B = Error | LogPayload | undefined>(
        level: LogLevel,
        message: A,
        payload?: B,
    ): this;
    private logz<A = Error, B = LogPayload | undefined>(
        level: LogLevel,
        error: A,
        payload?: B,
    ): this;
    private logz<A = LogPayload>(level: LogLevel, payload: A): this;
    private logz<
        A = string | Error | LogPayload,
        B = Error | LogPayload | undefined,
        C = LogPayload | undefined,
    >(level: LogLevel, messageOrErrorOrPayload: A, errorOrPayload?: B, payload?: C) {
        if (typeof messageOrErrorOrPayload === "string") {
            this.instance.log(level, messageOrErrorOrPayload, errorOrPayload, payload);
        } else {
            this.instance.log(level, "Error:", messageOrErrorOrPayload, errorOrPayload);
        }
        return this;
    }

    getInstance() {
        return this.instance;
    }
}
