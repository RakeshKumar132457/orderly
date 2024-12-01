import { Request, Response } from "express";
import { BillService } from "../services/bill.service";
import { ResponseHandler } from "../../../shared/utils/response.handler";

export class BillController {
  private billService: BillService;

  constructor() {
    this.billService = new BillService();
  }

  async generateBills(_req: Request, res: Response) {
    const bills = await this.billService.generateBills();
    return ResponseHandler.success(res, bills, 201);
  }

  async getAll(_req: Request, res: Response) {
    const bills = await this.billService.findAll();
    return ResponseHandler.success(res, bills);
  }

  async getById(req: Request, res: Response) {
    const bill = await this.billService.findById(req.params.id);
    return ResponseHandler.success(res, bill);
  }

  async getByContractor(req: Request, res: Response) {
    const bills = await this.billService.findByContractor(
      req.params.contractorId
    );
    return ResponseHandler.success(res, bills);
  }
}
