import { prisma } from "../../../config/database";
import { CreateEntityDto, UpdateEntityDto } from "../types/entity.types";
import { Prisma } from "@prisma/client";
import {
  NotFoundError,
  ConflictError,
} from "../../../shared/errors/app-errors";

export class EntityService {
  async create(data: CreateEntityDto) {
    try {
      return await prisma.entity.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError("Entity with this name already exists");
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await prisma.entity.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    const entity = await prisma.entity.findUnique({
      where: { id },
      include: {
        locations: true,
      },
    });
    if (!entity) {
      throw new NotFoundError("Entity");
    }
    return entity;
  }

  async update(id: string, data: UpdateEntityDto) {
    try {
      return await prisma.entity.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Entity");
        }
        if (error.code === "P2002") {
          throw new ConflictError("Entity with this name already exists");
        }
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await prisma.entity.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Entity");
        }
      }
      throw error;
    }
  }
}
