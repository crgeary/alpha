import { app } from "./app";
import { logger } from "./common/logger";
import { validateEnv } from "./env/validate-env.util";

const port = process.env.PORT || 4000;

validateEnv();

const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    logger.info(`🚀 Listening on port ${port}`);
});

const shutdown = () => {
    server.close();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
