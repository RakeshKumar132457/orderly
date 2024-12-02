import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { 
  ContractorResponse, 
  SingleContractorResponse, 
  CreateContractorRequest, 
  UpdateContractorRequest 
} from '../interfaces/contractor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private endpoint = '/contractors';

  constructor(private http: HttpService) {}

  getContractors(): Observable<ContractorResponse> {
    return this.http.get<ContractorResponse>(this.endpoint);
  }

  getContractor(id: string): Observable<SingleContractorResponse> {
    return this.http.get<SingleContractorResponse>(`${this.endpoint}/${id}`);
  }

  createContractor(data: CreateContractorRequest): Observable<SingleContractorResponse> {
    return this.http.post<SingleContractorResponse>(this.endpoint, data);
  }

  updateContractor(id: string, data: UpdateContractorRequest): Observable<SingleContractorResponse> {
    return this.http.put<SingleContractorResponse>(`${this.endpoint}/${id}`, data);
  }

  deleteContractor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}