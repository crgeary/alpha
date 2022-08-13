import { createLogger } from "@alpha/logger";
import { APP_NAME } from "../constants";

export const { logger } = createLogger({
    name: APP_NAME,
    environment: process.env.NODE_ENV,
});
