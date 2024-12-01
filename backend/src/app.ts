import express from "express";
import { env } from "./config/env";
import { v1Router } from "./routes/v1";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

setupSwagger(app);

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    env: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1", v1Router);
app.use(errorHandler);

export default app;
