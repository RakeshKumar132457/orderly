import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const LOCATION_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./components/location-list/location-list.component')
        .then(m => m.LocationListComponent)
  }
];