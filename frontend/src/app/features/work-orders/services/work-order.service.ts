import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { 
  WorkOrderResponse, 
  SingleWorkOrderResponse, 
  CreateWorkOrderRequest, 
  UpdateWorkOrderRequest 
} from '../interfaces/work-order.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private endpoint = '/work-orders';

  constructor(private http: HttpService) {}

  getWorkOrders(): Observable<WorkOrderResponse> {
    return this.http.get<WorkOrderResponse>(this.endpoint);
  }

  getWorkOrder(id: string): Observable<SingleWorkOrderResponse> {
    return this.http.get<SingleWorkOrderResponse>(`${this.endpoint}/${id}`);
  }

  getWorkOrdersByContractor(contractorId: string): Observable<WorkOrderResponse> {
    return this.http.get<WorkOrderResponse>(`${this.endpoint}/contractor/${contractorId}`);
  }

  createWorkOrder(data: CreateWorkOrderRequest): Observable<SingleWorkOrderResponse> {
    return this.http.post<SingleWorkOrderResponse>(this.endpoint, data);
  }

  updateWorkOrder(id: string, data: UpdateWorkOrderRequest): Observable<SingleWorkOrderResponse> {
    return this.http.put<SingleWorkOrderResponse>(`${this.endpoint}/${id}`, data);
  }

  deleteWorkOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}