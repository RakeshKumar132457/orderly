import { Response } from "express";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500,
}

interface ApiResponse<T> {
  status: "success" | "error";
  statusCode: number;
  timeStamp: string;
  data?: T;
  message?: string;
  errors?: any[];
  path?: string;
}

export class ResponseHandler {
  static success<T>(res: Response, data: T, statusCode: HttpStatus = HttpStatus.OK, message?: string): Response {
    const response: ApiResponse<T> = {
      status: "success",
      statusCode,
      timeStamp: new Date().toISOString(),
      path: res.req.originalUrl,
      data,
      message,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    errors?: any[],
  ): Response {
    const response: ApiResponse<null> = {
      status: "error",
      statusCode,
      timeStamp: new Date().toISOString(),
      path: res.req.originalUrl,
      message,
      errors,
    };
    return res.status(statusCode).json(response);
  }
}
