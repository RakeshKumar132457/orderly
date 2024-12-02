import { Entity } from "../../entities/interfaces/entity.interfaces";

export type LocationState = 'READY' | 'COMPLETED';

export interface Location {
  id: string;
  name: string;
  entityId: string;
  state: LocationState;
  createdAt: string;
  updatedAt: string;
  entity: Entity;
  workOrders: any[]; // We'll type this properly when implementing work orders
}

export interface LocationResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Location[];
}

export interface SingleLocationResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Location;
}

export interface CreateLocationRequest {
  name: string;
  entityId: string;
}

export interface UpdateLocationRequest extends CreateLocationRequest {}