export interface Entity {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface EntityResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Entity[];
}

export interface SingleEntityResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Entity;
}

export interface CreateEntityRequest {
  name: string;
}

export interface UpdateEntityRequest extends CreateEntityRequest {}