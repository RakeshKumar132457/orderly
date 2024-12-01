import { prisma } from "../../../config/database";
import {
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
} from "../types/work-order.types";
import { Prisma } from "@prisma/client";
import {
  NotFoundError,
  ConflictError,
} from "../../../shared/errors/app-errors";

export class WorkOrderService {
  async create(data: CreateWorkOrderDto) {
    try {
      // Check if contractor exists
      const contractor = await prisma.contractor.findUnique({
        where: { id: data.contractorId },
      });

      if (!contractor) {
        throw new NotFoundError("Contractor");
      }

      // Check if all locations exist and are in READY state
      const locations = await prisma.location.findMany({
        where: {
          id: { in: data.locations.map((loc) => loc.locationId) },
        },
      });

      if (locations.length !== data.locations.length) {
        throw new NotFoundError("One or more locations");
      }

      if (locations.some((loc) => loc.state === "COMPLETED")) {
        throw new ConflictError(
          "Cannot assign completed locations to work order"
        );
      }

      // Create work order with nested locations
      return await prisma.workOrder.create({
        data: {
          contractorId: data.contractorId,
          paymentTerms: data.paymentTerms,
          dueDate: new Date(data.dueDate),
          locations: {
            create: data.locations.map((loc) => ({
              location: { connect: { id: loc.locationId } },
              rate: loc.rate,
              quantity: loc.quantity,
            })),
          },
        },
        include: {
          contractor: true,
          locations: {
            include: {
              location: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError(
            "Duplicate location assignment in work order"
          );
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await prisma.workOrder.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        contractor: true,
        locations: {
          include: {
            location: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const workOrder = await prisma.workOrder.findUnique({
      where: { id },
      include: {
        contractor: true,
        locations: {
          include: {
            location: true,
          },
        },
      },
    });

    if (!workOrder) {
      throw new NotFoundError("Work Order");
    }

    return workOrder;
  }

  async update(id: string, data: UpdateWorkOrderDto) {
    try {
      // Check if work order exists
      const existingWorkOrder = await this.findById(id);

      // If contractor is being updated, check if new contractor exists
      if (data.contractorId) {
        const contractor = await prisma.contractor.findUnique({
          where: { id: data.contractorId },
        });

        if (!contractor) {
          throw new NotFoundError("Contractor");
        }
      }

      // If locations are being updated
      if (data.locations) {
        // Check if all new locations exist and are in READY state
        const locations = await prisma.location.findMany({
          where: {
            id: { in: data.locations.map((loc) => loc.locationId) },
          },
        });

        if (locations.length !== data.locations.length) {
          throw new NotFoundError("One or more locations");
        }

        if (locations.some((loc) => loc.state === "COMPLETED")) {
          throw new ConflictError(
            "Cannot assign completed locations to work order"
          );
        }

        // Delete existing location assignments and create new ones
        await prisma.workOrderLocation.deleteMany({
          where: { workOrderId: id },
        });
      }

      // Update work order
      return await prisma.workOrder.update({
        where: { id },
        data: {
          ...(data.contractorId && { contractorId: data.contractorId }),
          ...(data.paymentTerms && { paymentTerms: data.paymentTerms }),
          ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
          ...(data.locations && {
            locations: {
              create: data.locations.map((loc) => ({
                location: { connect: { id: loc.locationId } },
                rate: loc.rate,
                quantity: loc.quantity,
              })),
            },
          }),
        },
        include: {
          contractor: true,
          locations: {
            include: {
              location: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Work Order");
        }
        if (error.code === "P2002") {
          throw new ConflictError(
            "Duplicate location assignment in work order"
          );
        }
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      // First delete all associated workOrderLocations
      await prisma.workOrderLocation.deleteMany({
        where: { workOrderId: id },
      });

      // Then delete the work order
      return await prisma.workOrder.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Work Order");
        }
      }
      throw error;
    }
  }
}
