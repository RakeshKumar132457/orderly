import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ENTITY_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./components/entity-list/entity-list.component')
        .then(m => m.EntityListComponent)
  }
];