import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const WORK_ORDER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./components/work-order-list/work-order-list.component')
        .then(m => m.WorkOrderListComponent)
  }
];