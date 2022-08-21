import Rollbar, { LogArgument } from "rollbar";
import { LEVEL, MESSAGE, SPLAT } from "triple-beam";
import TransportStream from "winston-transport";
import { LogLevel } from "../types/log-level.type";

type LogTransportPayload = {
    [key: string | symbol]: unknown;
    message: string;
    [MESSAGE]: string;
    [LEVEL]: LogLevel;
    [SPLAT]?: LogArgument[];
};

export class RollbarTransport extends TransportStream {
    protected rollbar: Rollbar;

    constructor(options: TransportStream.TransportStreamOptions) {
        super(options);

        this.rollbar = new Rollbar({
            accessToken: process.env.ROLLBAR_SERVER_ACCESS_TOKEN,
            environment: "development",
        });
    }

    /**
     * Send log payload to Rollbar
     */
    log(payload: LogTransportPayload, cb: CallableFunction) {
        setImmediate(() => {
            this.emit("logged", payload);
        });

        const error = this.findError(payload);

        if (error) {
            this.rollbar[payload[LEVEL]](payload.message, error, ...(payload[SPLAT] || []));
        } else {
            this.rollbar[payload[LEVEL]](payload.message, ...(payload[SPLAT] || []));
        }

        cb();
    }

    /**
     * Searches for an error to associate with in Rollbar, will attempt
     * to find the first one provided to Winston
     */
    private findError(payload: LogTransportPayload) {
        const splatError = payload[SPLAT]?.find(this.isError);

        if (splatError) {
            return splatError;
        }

        return Object.values(payload).find(this.isError);
    }

    /**
     * Check the given item is an Error
     */
    private isError(item: unknown): item is Error {
        return item instanceof Error;
    }
}
