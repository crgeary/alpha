import { LogLevel } from "../types/log-level.type";

type LogLevelConfig = {
    levels: Record<LogLevel, number>;
    colors: Record<LogLevel, string>;
};

export const logLevels: LogLevelConfig = {
    levels: {
        debug: 50,
        info: 40,
        warning: 30,
        error: 20,
        critical: 10,
    },
    colors: {
        debug: "gray",
        info: "blue",
        warning: "yellow",
        error: "red",
        critical: "redBG white",
    },
};
