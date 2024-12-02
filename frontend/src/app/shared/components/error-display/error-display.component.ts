import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService, ErrorMessage } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./error-display.component.html"
})
export class ErrorDisplayComponent implements OnInit {
  errorMessage: ErrorMessage | null = null;
  private timeout: any;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.errors$.subscribe(error => {
      this.errorMessage = error;
      // Clear the error after 5 seconds
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.clearError();
      }, 5000);
    });
  }

  clearError() {
    this.errorMessage = null;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}