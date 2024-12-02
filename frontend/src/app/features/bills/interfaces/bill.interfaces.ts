import { Contractor } from "../../contractors/interfaces/contractor.interfaces";

export interface BillLocation {
  id: string;
  billId: string;
  name: string;
  rate: number;
  quantity: number;
}

export interface Bill {
  id: string;
  billNumber: string;
  contractorId: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  contractor: Contractor;
  locations: BillLocation[];
}

export interface BillResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Bill[];
}

export interface SingleBillResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Bill;
}