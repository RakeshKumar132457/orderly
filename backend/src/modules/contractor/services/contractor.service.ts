import { prisma } from "../../../config/database";
import { CreateContractorDto, UpdateContractorDto } from "../types/contractor.types";
import { Prisma } from "@prisma/client";
import { NotFoundError, ConflictError } from "../../../shared/errors/app-errors";

export class ContractorService {
  async create(data: CreateContractorDto) {
    try {
      return await prisma.contractor.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError("Phone number already exists");
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await prisma.contractor.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    const contractor = await prisma.contractor.findUnique({
      where: { id },
      include: {
        workOrders: true,
      },
    });

    if (!contractor) {
      throw new NotFoundError("Contractor");
    }

    return contractor;
  }

  async update(id: string, data: UpdateContractorDto) {
    try {
      return await prisma.contractor.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Contractor");
        }
        if (error.code === "P2002") {
          throw new ConflictError("Phone number already exists");
        }
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await prisma.contractor.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Contractor");
        }
      }
      throw error;
    }
  }
}
