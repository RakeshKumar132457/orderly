import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ErrorMessage {
  message: string;
  type: 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<ErrorMessage>();
  errors$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next({ message, type: 'error' });
  }

  showWarning(message: string) {
    this.errorSubject.next({ message, type: 'warning' });
  }

  showInfo(message: string) {
    this.errorSubject.next({ message, type: 'info' });
  }
}