import { PrismaClient } from "@prisma/client";
import { RegisterUserDto, LoginUserDto } from "../types/auth.types";
import { AppError } from "../../../shared/errors/app-errors";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  private generateToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async register(data: RegisterUserDto) {
    try {
      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new AppError("Email already registered", 409);
      }

      // Hash password
      const hashedPassword = await argon2.hash(data.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
      });

      // Create user
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      // Generate token
      const token = this.generateToken(user.id);

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginUserDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    // Check password
    const isPasswordMatch = await argon2.verify(user.password, data.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
