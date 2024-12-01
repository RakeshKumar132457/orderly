import { Request, Response, NextFunction } from "express";
import Logger from "../../config/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();
  
  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = `+${(seconds * 1000 + nanoseconds / 1000000).toFixed(0)}ms`;
    
    Logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}`);
  });

  next();
};