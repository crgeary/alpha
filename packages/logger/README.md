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

logger.debug("Lorem ipsum dolor");
logger.info("Lorem ipsum dolor", { a: 1, b: 2, c: 3 });
logger.warn({ a: 1, b: 2, c: 3 });
logger.error(new Error("Sed ut perspiciatis"));
logger.fatal(new Error("Sed ut perspiciatis"), { a: 1, b: 2, c: 3 });
```

### Severity Levels

Supports the following log severity levels:

-   trace
-   debug
-   info
-   warn
-   error
-   fatal
