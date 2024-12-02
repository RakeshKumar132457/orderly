import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // These will be lazy loaded when we implement them
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'contractors',
        loadChildren: () =>
          import('./features/contractors/contractor.routes').then(
            (m) => m.CONTRACTOR_ROUTES
          ),
      },
      {
        path: 'entities',
        loadChildren: () =>
          import('./features/entities/entity.routes').then(
            (m) => m.ENTITY_ROUTES
          ),
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('./features/locations/location.routes').then(
            (m) => m.LOCATION_ROUTES
          ),
      },
      {
        path: 'work-orders',
        loadChildren: () =>
          import('./features/work-orders/work-order.routes').then(
            (m) => m.WORK_ORDER_ROUTES
          ),
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('./features/bills/bill.routes').then((m) => m.BILL_ROUTES),
      },
    ],
  },
];
