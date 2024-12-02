import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { BillResponse, SingleBillResponse } from '../interfaces/bill.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private endpoint = '/bills';

  constructor(private http: HttpService) {}

  getBills(): Observable<BillResponse> {
    return this.http.get<BillResponse>(this.endpoint);
  }

  getBill(id: string): Observable<SingleBillResponse> {
    return this.http.get<SingleBillResponse>(`${this.endpoint}/${id}`);
  }

  getBillsByContractor(contractorId: string): Observable<BillResponse> {
    return this.http.get<BillResponse>(`${this.endpoint}/contractor/${contractorId}`);
  }

  generateBills(): Observable<BillResponse> {
    return this.http.post<BillResponse>(`${this.endpoint}/generate`, {});
  }
}