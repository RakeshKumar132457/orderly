import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/app-errors";
import { ResponseHandler, HttpStatus } from "../utils/response.handler";

export const errorHandler: ErrorRequestHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    ResponseHandler.error(res, error.message, error.statusCode);
    return;
  }

  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    ResponseHandler.error(res, "Validation failed", HttpStatus.BAD_REQUEST, validationErrors);
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(`Prisma Error: ${error.code} - ${error.message}`);
    ResponseHandler.error(res, "Database operation failed", HttpStatus.INTERNAL_SERVER);
    return;
  }

  console.error("Unhandled Error:", error);
  ResponseHandler.error(res, "Internal server error", HttpStatus.INTERNAL_SERVER);
  return;
};
