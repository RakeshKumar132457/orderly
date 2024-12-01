import { Request, Response } from "express";
import { ContractorService } from "../services/contractor.service";
import { CreateContractorDto, UpdateContractorDto } from "../types/contractor.types";
import { ResponseHandler } from "../../../shared/utils/response.handler";

export class ContractorController {
  private contractorService: ContractorService;

  constructor() {
    this.contractorService = new ContractorService();
  }

  async create(req: Request, res: Response) {
    const validateData = CreateContractorDto.parse(req.body);
    const contractor = await this.contractorService.create(validateData);
    return ResponseHandler.success(res, contractor, 201);
  }

  async getAll(_req: Request, res: Response) {
    const contractors = await this.contractorService.findAll();
    return ResponseHandler.success(res, contractors);
  }

  async getById(req: Request, res: Response) {
    const contractor = await this.contractorService.findById(req.params.id);
    return ResponseHandler.success(res, contractor);
  }

  async update(req: Request, res: Response) {
    const validatedData = UpdateContractorDto.parse(req.body);
    const contractor = await this.contractorService.update(req.params.id, validatedData);
    return ResponseHandler.success(res, contractor);
  }

  async delete(req: Request, res: Response) {
    await this.contractorService.delete(req.params.id);
    return ResponseHandler.success(res, null, 204);
  }
}
