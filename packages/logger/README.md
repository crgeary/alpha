# @alpha/logger

> Part of [Alpha](https://github.com/crgeary/alpha).

## Usage

```ts
// Create a new logger.
const { logger } = createLogger({
    name: "example-app",
    environment: process.env.NODE_ENV,
});

// Start logging.
logger.debug({ user: 123 }, "Lorem ipsum dolor: %o");
logger.info("Lorem ipsum dolor sit amet");
logger.warn("Lorem ipsum dolor");
logger.error("Lorem ipsum dolor");
logger.fatal({ user: 123 }: "Lorem ipsum dolor: %o");
```