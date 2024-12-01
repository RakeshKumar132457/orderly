import { Request, Response } from "express";
import { WorkOrderService } from "../services/work-order.service";
import {
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
} from "../types/work-order.types";
import { ResponseHandler } from "../../../shared/utils/response.handler";

export class WorkOrderController {
  private workOrderService: WorkOrderService;

  constructor() {
    this.workOrderService = new WorkOrderService();
  }

  async create(req: Request, res: Response) {
    const validateData = CreateWorkOrderDto.parse(req.body);
    const workOrder = await this.workOrderService.create(validateData);
    return ResponseHandler.success(res, workOrder, 201);
  }

  async getAll(_req: Request, res: Response) {
    const workOrders = await this.workOrderService.findAll();
    return ResponseHandler.success(res, workOrders);
  }

  async getById(req: Request, res: Response) {
    const workOrder = await this.workOrderService.findById(req.params.id);
    return ResponseHandler.success(res, workOrder);
  }

  async update(req: Request, res: Response) {
    const validatedData = UpdateWorkOrderDto.parse(req.body);
    const workOrder = await this.workOrderService.update(
      req.params.id,
      validatedData
    );
    return ResponseHandler.success(res, workOrder);
  }

  async delete(req: Request, res: Response) {
    await this.workOrderService.delete(req.params.id);
    return ResponseHandler.success(res, null, 204);
  }
}
