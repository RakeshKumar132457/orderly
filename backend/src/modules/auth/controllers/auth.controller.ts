import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto, LoginUserDto } from "../types/auth.types";
import { ResponseHandler } from "../../../shared/utils/response.handler";
import { prisma } from "../../../config/database";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService(prisma);
  }

  async register(req: Request, res: Response) {
    const validatedData = RegisterUserDto.parse(req.body);
    const result = await this.authService.register(validatedData);
    return ResponseHandler.success(res, result, 201);
  }

  async login(req: Request, res: Response) {
    const validatedData = LoginUserDto.parse(req.body);
    const result = await this.authService.login(validatedData);
    return ResponseHandler.success(res, result);
  }
}
