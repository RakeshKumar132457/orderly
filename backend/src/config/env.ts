import { config } from "dotenv";

import path from "path";

config({ path: path.join(__dirname, "../../.env") });

const requiredEnvs = ["PORT", "DATABASE_URL", "CORS_ORIGIN"] as const;

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    throw new Error(`${env} is required`);
  }
}

export const env = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
} as const;
