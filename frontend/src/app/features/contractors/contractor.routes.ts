import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const CONTRACTOR_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./components/contractor-list/contractor-list.component')
        .then(m => m.ContractorListComponent)
  }
];