import pino, { LoggerOptions } from "pino";

export class LoggerService {
    private pino;

    constructor(options: LoggerOptions) {
        this.pino = pino(options);
    }

    trace(message: string | number, data?: object): void;
    trace(err: Error): void;
    trace(data: object): void;
    trace(input: string | number | Error | object, data?: object) {
        return this.pino.trace(...this.normalize(input, data));
    }

    debug(message: string | number, data?: object): void;
    debug(err: Error): void;
    debug(data: object): void;
    debug(input: string | number | Error | object, data?: object) {
        return this.pino.debug(...this.normalize(input, data));
    }

    info(message: string | number, data?: object): void;
    info(err: Error): void;
    info(data: object): void;
    info(input: string | number | object | Error, data?: object) {
        return this.pino.info(...this.normalize(input, data));
    }

    warn(message: string | number, data?: object): void;
    warn(err: Error): void;
    warn(data: object): void;
    warn(input: string | number | Error | object, data?: object) {
        return this.pino.warn(...this.normalize(input, data));
    }

    error(message: string | number, data?: object): void;
    error(err: Error): void;
    error(data: object): void;
    error(input: string | number | Error | object, data?: object) {
        return this.pino.error(...this.normalize(input, data));
    }

    fatal(message: string | number, data?: object): void;
    fatal(err: Error): void;
    fatal(data: object): void;
    fatal(input: string | number | Error | object, data?: object) {
        return this.pino.fatal(...this.normalize(input, data));
    }

    getPino() {
        return this.pino;
    }

    private normalize(input: unknown, data?: object): [unknown, string | undefined] {
        if (typeof input === "string" || typeof input === "number") {
            return typeof data === "undefined" ? [input, undefined] : [data, `${input}`];
        }
        return [input, undefined];
    }
}
