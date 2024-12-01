import { prisma } from "../../../config/database";
import { CreateLocationDto, UpdateLocationDto } from "../types/location.types";
import { Prisma } from "@prisma/client";
import {
  NotFoundError,
  ConflictError,
} from "../../../shared/errors/app-errors";

export class LocationService {
  async create(data: CreateLocationDto) {
    try {
      // First check if the entity exists
      const entity = await prisma.entity.findUnique({
        where: { id: data.entityId },
      });

      if (!entity) {
        throw new NotFoundError("Entity");
      }

      return await prisma.location.create({
        data,
        include: {
          entity: true,
          workOrders: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError(
            "Location with this name already exists for this entity"
          );
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await prisma.location.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        entity: true,
        workOrders: true,
      },
    });
  }

  async findById(id: string) {
    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        entity: true,
        workOrders: true,
      },
    });

    if (!location) {
      throw new NotFoundError("Location");
    }

    return location;
  }

  async update(id: string, data: UpdateLocationDto) {
    try {
      if (data.entityId) {
        // Check if the new entity exists
        const entity = await prisma.entity.findUnique({
          where: { id: data.entityId },
        });

        if (!entity) {
          throw new NotFoundError("Entity");
        }
      }

      return await prisma.location.update({
        where: { id },
        data,
        include: {
          entity: true,
          workOrders: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Location");
        }
        if (error.code === "P2002") {
          throw new ConflictError(
            "Location with this name already exists for this entity"
          );
        }
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await prisma.location.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Location");
        }
      }
      throw error;
    }
  }

  async markAsComplete(id: string) {
    try {
      return await prisma.location.update({
        where: { id },
        data: { state: "COMPLETED" },
        include: {
          entity: true,
          workOrders: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Location");
        }
      }
      throw error;
    }
  }
}
