export interface Contractor {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractorResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Contractor[];
}

export interface SingleContractorResponse {
  status: string;
  statusCode: number;
  timeStamp: string;
  path: string;
  data: Contractor;
}

export interface CreateContractorRequest {
  name: string;
  phone: string;
}

export interface UpdateContractorRequest extends CreateContractorRequest {}