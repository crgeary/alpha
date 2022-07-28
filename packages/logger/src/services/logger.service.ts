import pino, { LoggerOptions } from "pino";

export class LoggerService {
    private pino;

    constructor(options: LoggerOptions) {
        this.pino = pino(options);
    }

    debug(message: string, data: object) {
        this.pino.debug(data, message);
    }

    info(message: string, data: object) {
        this.pino.debug(data, message);
    }

    warn(message: string, data: object) {
        this.pino.debug(data, message);
    }

    error(message: string, data: object) {
        this.pino.debug(data, message);
    }

    fatal(message: string, data: object) {
        this.pino.debug(data, message);
    }

    getPino() {
        return this.pino;
    }
}
