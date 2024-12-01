import { prisma } from "../../../config/database";
import { CreateBillDto } from "../types/bill.types";
import { Prisma } from "@prisma/client";
import {
  NotFoundError,
  ConflictError,
} from "../../../shared/errors/app-errors";

export class BillService {
  private async generateBillNumber(): Promise<string> {
    const count = await prisma.bill.count();
    return `BILL-${String(count + 1).padStart(2, "0")}`;
  }

  async generateBills() {
    try {
      // Get all contractors
      const contractors = await prisma.contractor.findMany({
        include: {
          workOrders: {
            include: {
              locations: {
                include: {
                  location: true,
                },
              },
            },
          },
        },
      });

      const generatedBills = [];

      for (const contractor of contractors) {
        // Get all completed locations from contractor's work orders
        const completedLocations = contractor.workOrders.flatMap((wo) =>
          wo.locations.filter((loc) => loc.location.state === "COMPLETED")
        );

        // Skip if no completed locations
        if (completedLocations.length === 0) continue;

        // Check if locations are already billed
        const unbilledLocations = await this.filterUnbilledLocations(
          completedLocations
        );
        if (unbilledLocations.length === 0) continue;

        // Generate bill number
        const billNumber = await this.generateBillNumber();

        // Calculate total amount
        const totalAmount = unbilledLocations.reduce(
          (sum, loc) => sum + loc.rate * loc.quantity,
          0
        );

        // Create bill with locations
        const bill = await prisma.bill.create({
          data: {
            billNumber,
            contractorId: contractor.id,
            totalAmount,
            locations: {
              create: unbilledLocations.map((loc) => ({
                name: loc.location.name,
                rate: loc.rate,
                quantity: loc.quantity,
              })),
            },
          },
          include: {
            contractor: true,
            locations: true,
          },
        });

        generatedBills.push(bill);
      }

      return generatedBills;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError("Bill number already exists");
        }
      }
      throw error;
    }
  }

  private async filterUnbilledLocations(locations: any[]) {
    // Get all billed location names
    const billedLocations = await prisma.billLocation.findMany({
      select: { name: true },
    });
    const billedLocationNames = new Set(billedLocations.map((bl) => bl.name));

    // Filter out already billed locations
    return locations.filter(
      (loc) => !billedLocationNames.has(loc.location.name)
    );
  }

  async findAll() {
    return await prisma.bill.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        contractor: true,
        locations: true,
      },
    });
  }

  async findById(id: string) {
    const bill = await prisma.bill.findUnique({
      where: { id },
      include: {
        contractor: true,
        locations: true,
      },
    });

    if (!bill) {
      throw new NotFoundError("Bill");
    }

    return bill;
  }

  async findByContractor(contractorId: string) {
    return await prisma.bill.findMany({
      where: { contractorId },
      include: {
        contractor: true,
        locations: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
