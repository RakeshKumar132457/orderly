import { Request, Response } from "express";
import { LocationService } from "../services/location.service";
import { CreateLocationDto, UpdateLocationDto } from "../types/location.types";
import { ResponseHandler } from "../../../shared/utils/response.handler";

export class LocationController {
  private locationService: LocationService;

  constructor() {
    this.locationService = new LocationService();
  }

  async create(req: Request, res: Response) {
    const validateData = CreateLocationDto.parse(req.body);
    const location = await this.locationService.create(validateData);
    return ResponseHandler.success(res, location, 201);
  }

  async getAll(_req: Request, res: Response) {
    const locations = await this.locationService.findAll();
    return ResponseHandler.success(res, locations);
  }

  async getById(req: Request, res: Response) {
    const location = await this.locationService.findById(req.params.id);
    return ResponseHandler.success(res, location);
  }

  async update(req: Request, res: Response) {
    const validatedData = UpdateLocationDto.parse(req.body);
    const location = await this.locationService.update(
      req.params.id,
      validatedData
    );
    return ResponseHandler.success(res, location);
  }

  async delete(req: Request, res: Response) {
    await this.locationService.delete(req.params.id);
    return ResponseHandler.success(res, null, 204);
  }

  async markAsComplete(req: Request, res: Response) {
    const location = await this.locationService.markAsComplete(req.params.id);
    return ResponseHandler.success(res, location);
  }
}
