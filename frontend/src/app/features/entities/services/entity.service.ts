import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { 
  EntityResponse, 
  SingleEntityResponse, 
  CreateEntityRequest, 
  UpdateEntityRequest 
} from '../interfaces/entity.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private endpoint = '/entities';

  constructor(private http: HttpService) {}

  getEntities(): Observable<EntityResponse> {
    return this.http.get<EntityResponse>(this.endpoint);
  }

  getEntity(id: string): Observable<SingleEntityResponse> {
    return this.http.get<SingleEntityResponse>(`${this.endpoint}/${id}`);
  }

  createEntity(data: CreateEntityRequest): Observable<SingleEntityResponse> {
    return this.http.post<SingleEntityResponse>(this.endpoint, data);
  }

  updateEntity(id: string, data: UpdateEntityRequest): Observable<SingleEntityResponse> {
    return this.http.put<SingleEntityResponse>(`${this.endpoint}/${id}`, data);
  }

  deleteEntity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}