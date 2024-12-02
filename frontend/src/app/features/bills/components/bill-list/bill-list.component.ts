import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../interfaces/bill.interfaces';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-list.component.html'
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  isLoading = false;
  error: string | null = null;
  isGenerating = false;

  constructor(
    private billService: BillService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.isLoading = true;
    this.billService.getBills().subscribe({
      next: (response) => {
        this.bills = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.errorService.showError('Failed to load bills');
      }
    });
  }

  generateBills(): void {
    if (this.isGenerating) return;

    if (confirm('Are you sure you want to generate bills for completed locations?')) {
      this.isGenerating = true;
      this.billService.generateBills().subscribe({
        next: (response) => {
          this.loadBills();
          this.isGenerating = false;
          const billCount = response.data.length;
          this.errorService.showInfo(
            `Successfully generated ${billCount} ${billCount === 1 ? 'bill' : 'bills'}`
          );
        },
        error: (error) => {
          this.errorService.showError('Failed to generate bills');
          this.isGenerating = false;
        }
      });
    }
  }
}