import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const LOG_COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

const FILE_OPTIONS = {
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
};

const TRANSPORT_CONFIG = [
  new winston.transports.Console(),
  new DailyRotateFile({
    ...FILE_OPTIONS,
    filename: path.join(__dirname, "..", "..", "logs", "error-%DATE%.log"),
    level: "error",
  }),
  new DailyRotateFile({
    ...FILE_OPTIONS,
    filename: path.join(__dirname, "..", "..", "logs", "all-%DATE%.log"),
  }),
];

const determineLogLevel = (): string => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "warn";
};

const formatLogMessage = (info: winston.Logform.TransformableInfo): string => {
  const pid = process.pid || "1";
  return `[${info.level}] ${pid}  - ${info.timestamp} : ${info.message}`;
};

winston.addColors(LOG_COLORS);

const LOG_FORMAT = winston.format.combine(
  winston.format.timestamp({ format: "MM/DD/YYYY, HH:mm:ss A" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(formatLogMessage)
);

const Logger = winston.createLogger({
  level: determineLogLevel(),
  levels: LOG_LEVELS,
  format: LOG_FORMAT,
  transports: TRANSPORT_CONFIG,
});

export default Logger;
