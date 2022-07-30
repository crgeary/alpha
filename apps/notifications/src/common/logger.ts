import { createLogger } from "@alpha/logger";

export const { logger } = createLogger({
    name: "notifications",
    environment: process.env.NODE_ENV,
});
