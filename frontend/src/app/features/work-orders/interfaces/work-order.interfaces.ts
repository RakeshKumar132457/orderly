import { Contractor } from "../../contractors/interfaces/contractor.interfaces";
import { Location } from "../../locations/interfaces/location.interfaces";

export interface WorkOrderLocation {
  id: string;
  workOrderId: string;
  locationId: string;
  rate: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  location: Location;
}

export interface WorkOrder {
  id: string;
  contractorId: string;
  paymentTerms: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  contractor: Contractor;
  locations: WorkOrderLocation[];
}

export interface WorkOrderResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: WorkOrder[];
}

export interface SingleWorkOrderResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: WorkOrder;
}

export interface CreateWorkOrderLocationRequest {
  locationId: string;
  rate: number;
  quantity: number;
}

export interface CreateWorkOrderRequest {
  contractorId: string;
  paymentTerms: number;
  dueDate: string;
  locations: CreateWorkOrderLocationRequest[];
}

export interface UpdateWorkOrderRequest extends CreateWorkOrderRequest {}