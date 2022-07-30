import { app } from "./app";
import { logger } from "./common/logger";

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    logger.info(`🚀 Listening on port ${port}`);
});

const shutdown = () => {
    server.close();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
