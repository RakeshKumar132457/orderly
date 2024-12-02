import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const BILL_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./components/bill-list/bill-list.component')
        .then(m => m.BillListComponent)
  }
];