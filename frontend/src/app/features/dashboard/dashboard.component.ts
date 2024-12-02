import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the Work Order Management System</p>
    </div>
  `
})
export class DashboardComponent {}