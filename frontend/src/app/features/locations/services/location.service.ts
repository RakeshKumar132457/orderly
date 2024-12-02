import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { 
  LocationResponse, 
  SingleLocationResponse, 
  CreateLocationRequest, 
  UpdateLocationRequest 
} from '../interfaces/location.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private endpoint = '/locations';

  constructor(private http: HttpService) {}

  getLocations(): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(this.endpoint);
  }

  getLocation(id: string): Observable<SingleLocationResponse> {
    return this.http.get<SingleLocationResponse>(`${this.endpoint}/${id}`);
  }

  createLocation(data: CreateLocationRequest): Observable<SingleLocationResponse> {
    return this.http.post<SingleLocationResponse>(this.endpoint, data);
  }

  updateLocation(id: string, data: UpdateLocationRequest): Observable<SingleLocationResponse> {
    return this.http.put<SingleLocationResponse>(`${this.endpoint}/${id}`, data);
  }

  deleteLocation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  markAsComplete(id: string): Observable<SingleLocationResponse> {
    return this.http.patch<SingleLocationResponse>(`${this.endpoint}/${id}/complete`, {});
  }
}