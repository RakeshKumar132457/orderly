import { Request, Response } from "express";
import { EntityService } from "../services/entity.service";
import { CreateEntityDto, UpdateEntityDto } from "../types/entity.types";
import { ResponseHandler } from "../../../shared/utils/response.handler";

export class EntityController {
  private entityService: EntityService;

  constructor() {
    this.entityService = new EntityService();
  }

  async create(req: Request, res: Response) {
    const validateData = CreateEntityDto.parse(req.body);
    const entity = await this.entityService.create(validateData);
    return ResponseHandler.success(res, entity, 201);
  }

  async getAll(_req: Request, res: Response) {
    const entities = await this.entityService.findAll();
    return ResponseHandler.success(res, entities);
  }

  async getById(req: Request, res: Response) {
    const entity = await this.entityService.findById(req.params.id);
    return ResponseHandler.success(res, entity);
  }

  async update(req: Request, res: Response) {
    const validatedData = UpdateEntityDto.parse(req.body);
    const entity = await this.entityService.update(
      req.params.id,
      validatedData
    );
    return ResponseHandler.success(res, entity);
  }

  async delete(req: Request, res: Response) {
    await this.entityService.delete(req.params.id);
    return ResponseHandler.success(res, null, 204);
  }
}
