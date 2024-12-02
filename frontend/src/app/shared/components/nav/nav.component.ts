import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/contractors', label: 'Contractors' },
    { path: '/entities', label: 'Entities' },
    { path: '/locations', label: 'Locations' },
    { path: '/work-orders', label: 'Work Orders' },
    { path: '/bills', label: 'Bills' },
  ];

  get currentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  get currentPath(): string {
    return window.location.pathname;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}