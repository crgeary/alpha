import "dotenv/config";
import "reflect-metadata";

// --

import express from "express";

const app = express();

app.get("*", (_, res) => res.json({ message: `Hello World!` }));

export { app };
