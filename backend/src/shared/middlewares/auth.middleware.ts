import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/database";
import { AppError } from "../errors/app-errors";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get token from header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Not authorized to access this route", 401);
    }

    // 2) Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    // 3) Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    // 4) Add user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
